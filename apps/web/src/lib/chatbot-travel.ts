import { destinations } from "@/lib/mock-data";

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

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

const destinationProfiles = [
  {
    city: "Da Nang",
    note: "hop nghi bien ngan ngay, de di cuoi tuan, nhieu lua chon cho gia dinh va nhom ban",
    tags: ["bien", "gia dinh", "cuoi tuan", "an uong", "nghi duong"]
  },
  {
    city: "Phu Quoc",
    note: "hop nghi duong, cap doi, gia dinh co tre nho va nhu cau bien dao thu gian",
    tags: ["bien", "nghi duong", "tre nho", "cap doi", "dao"]
  },
  {
    city: "Ha Noi",
    note: "hop kham pha van hoa, am thuc va cac chuyen di ket hop cong viec",
    tags: ["mien bac", "van hoa", "am thuc", "cong tac"]
  },
  {
    city: "Thanh pho Ho Chi Minh",
    note: "hop city break, trai nghiem do thi va lam diem noi di cac chang khac",
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
      return `- ${destination.city} (${destination.airport}), gia tham khao tu ${destination.priceFrom.toLocaleString("vi-VN")} VND, diem nhan: ${destination.highlights.join(", ")}`;
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
    "Minh dang tam thoi khong lay duoc goi y AI truc tiep, nen gui ban mot vai huong di nhanh de tham khao:\n\n" +
    `${suggestions}\n\n` +
    "Ban co the hoi lai theo mau nhu: di 3 ngay 2 dem, ngan sach bao nhieu, di voi ai va muon nghi duong hay kham pha de minh goi y sat hon."
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
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      actions: [
        { href: "/blog", label: "Xem them bai du lich" },
        { href: "/search", label: "Tim chuyen bay" }
      ],
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
        thinkingLevel: "minimal"
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

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      method: "POST"
    });

    if (!response.ok) {
      return {
        actions: [
          { href: "/blog", label: "Xem them bai du lich" },
          { href: "/search", label: "Tim chuyen bay" }
        ],
        reply: fallbackReply
      };
    }

    const data = (await response.json()) as GeminiResponse;
    const reply = extractGeminiText(data);

    if (!reply) {
      return {
        actions: [
          { href: "/blog", label: "Xem them bai du lich" },
          { href: "/search", label: "Tim chuyen bay" }
        ],
        reply: fallbackReply
      };
    }

    return {
      actions: [
        { href: "/blog", label: "Xem them bai du lich" },
        { href: "/search", label: "Tim chuyen bay" }
      ],
      reply
    };
  } catch {
    return {
      actions: [
        { href: "/blog", label: "Xem them bai du lich" },
        { href: "/search", label: "Tim chuyen bay" }
      ],
      reply: fallbackReply
    };
  }
}
