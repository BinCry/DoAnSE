import { destinations } from "@/lib/mock-data";
import { getGeminiApiKey, getGeminiModel } from "@/lib/server-env";

import type { ChatbotAction, ChatbotApiMessage } from "@/lib/chatbot-shared";

interface GeminiCandidatePart {
  text?: string;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiCandidatePart[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
}

interface TravelReply {
  actions?: ChatbotAction[];
  reply: string;
}

const GEMINI_TIMEOUT_MS = 15000;

const defaultTravelActions: ChatbotAction[] = [
  { href: "/blog", label: "Xem thêm bài du lịch" },
  { href: "/search", label: "Tìm chuyến bay" }
];

const destinationProfiles = [
  {
    city: "Đà Nẵng",
    note: "hợp nghỉ biển ngắn ngày, dễ đi cuối tuần, nhiều lựa chọn cho gia đình và nhóm bạn",
    tags: ["bien", "gia dinh", "cuoi tuan", "an uong", "nghi duong"]
  },
  {
    city: "Phú Quốc",
    note: "hợp nghỉ dưỡng, cặp đôi, gia đình có trẻ nhỏ và nhu cầu biển đảo thư giãn",
    tags: ["bien", "nghi duong", "tre nho", "cap doi", "dao"]
  },
  {
    city: "Hà Nội",
    note: "hợp khám phá văn hóa, ẩm thực và các chuyến đi kết hợp công việc",
    tags: ["mien bac", "van hoa", "am thuc", "cong tac"]
  },
  {
    city: "Thành phố Hồ Chí Minh",
    note: "hợp city break, trải nghiệm đô thị và làm điểm nối đi các chặng khác",
    tags: ["thanh pho", "city break", "ngan ngay", "giai tri"]
  }
];

function normalizeText(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLocaleLowerCase("vi-VN");
}

function extractGeminiText(data: GeminiResponse) {
  return (data.candidates ?? [])
    .flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text?.trim() ?? "")
    .filter(Boolean)
    .join("\n")
    .trim();
}

function buildGroundingContext() {
  return destinations
    .map((destination) => {
      return `- ${destination.city} (${destination.airport}), giá tham khảo từ ${destination.priceFrom.toLocaleString("vi-VN")} VND, điểm nhấn: ${destination.highlights.join(", ")}`;
    })
    .join("\n");
}

function buildTravelFallbackReply(question: string): string {
  const normalizedQuestion = normalizeText(question);

  const rankedDestinations = destinationProfiles
    .map((destination) => {
      const score = destination.tags.reduce((total, tag) => {
        return total + (normalizedQuestion.includes(tag) ? 1 : 0);
      }, 0);

      return {
        ...destination,
        score
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  const suggestions = rankedDestinations
    .map((destination, index) => {
      return `${index + 1}. ${destination.city}: ${destination.note}.`;
    })
    .join("\n");

  return (
    "Mình đang tạm thời không lấy được gợi ý AI trực tiếp, nên gửi bạn một vài hướng đi nhanh để tham khảo:\n\n" +
    `${suggestions}\n\n` +
    "Bạn có thể hỏi lại theo mẫu như: đi 3 ngày 2 đêm, ngân sách bao nhiêu, đi với ai và muốn nghỉ dưỡng hay khám phá để mình gợi ý sát hơn."
  );
}

function buildGeminiEndpoint(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

function buildGeminiModelQueue() {
  return Array.from(
    new Set(
      [getGeminiModel(), "gemini-2.5-flash"].filter(
        (model): model is string => Boolean(model)
      )
    )
  );
}

export async function buildTravelReply(
  messages: ChatbotApiMessage[]
): Promise<TravelReply> {
  const latestQuestion =
    messages
      .slice()
      .reverse()
      .find((message) => message.role === "user")?.content ?? "";

  const fallbackReply = buildTravelFallbackReply(latestQuestion);
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    return {
      actions: defaultTravelActions,
      reply: fallbackReply
    };
  }

  const groundedDestinations = buildGroundingContext();

  const payload = {
    contents: messages.slice(-10).map((message) => ({
      parts: [{ text: message.content }],
      role: message.role === "assistant" ? "model" : "user"
    })),
    generationConfig: {
      maxOutputTokens: 360,
      temperature: 0.7,
      topP: 0.9,
      thinkingConfig: {
        thinkingBudget: 0
      }
    },
    systemInstruction: {
      parts: [
        {
          text:
            `Ban la tro ly goi y du lich bang tieng Viet cho website Vietnam Airlines.\n` +
            `Hom nay la 16/03/2026.\n` +
            `Hay tra loi gon trong khoang 120 den 160 tu, thuc te va de doc.\n` +
            `Neu nguoi dung da dua du thong tin nhu diem di, thoi luong hoac nhom khach, khong hoi lai mo dau.\n` +
            `Hay goi y dung 3 phuong an phu hop nhat.\n` +
            `Moi phuong an chi 1 dong theo mau: Ten diem den - ly do phu hop - chi phi tuong doi - luu y ngan.\n` +
            `Neu thong tin con thieu, chi hoi them toi da 1 cau ngan o cuoi cau tra loi.\n` +
            `Khong bia du lieu chuyen bay thoi gian thuc, khong khang dinh gia ve dang ban, khong khang dinh thoi tiet hien tai.\n` +
            `Khong dung markdown phuc tap hoac doan qua dai.\n` +
            `Ket thuc bang 1 cau ngan goi y buoc tiep theo nhu doc blog hoac tim chuyen bay.\n\n` +
            `Mot so diem den va du lieu tham khao tren website:\n${groundedDestinations}`
        }
      ]
    }
  };

  for (const model of buildGeminiModelQueue()) {
    try {
      const response = await fetch(buildGeminiEndpoint(model), {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        method: "POST",
        signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS)
      });

      if (!response.ok) {
        console.error(
          `[chatbot-travel] Goi ${model} that bai voi ma ${response.status}.`
        );
        continue;
      }

      const data = (await response.json()) as GeminiResponse;
      const reply = extractGeminiText(data);

      if (!reply) {
        console.error(`[chatbot-travel] ${model} khong tra noi dung hop le.`);
        continue;
      }

      return {
        actions: defaultTravelActions,
        reply
      };
    } catch (error) {
      console.error(`[chatbot-travel] Loi khi goi ${model}.`, error);
    }
  }

  return {
    actions: defaultTravelActions,
    reply: fallbackReply
  };
}
