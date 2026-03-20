import { NextResponse } from "next/server";

import { isWeatherQuestion } from "@/lib/chatbot-weather";
import { buildSupportReply } from "@/lib/chatbot-support";
import { buildTravelReply } from "@/lib/chatbot-travel";
import type {
  ChatMode,
  ChatbotApiMessage,
  ChatbotApiRequest,
  ChatbotApiResponse
} from "@/lib/chatbot-shared";

export const dynamic = "force-dynamic";

function isChatMode(value: unknown): value is ChatMode {
  return value === "support" || value === "travel";
}

function sanitizeMessages(value: unknown): ChatbotApiMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const content =
        "content" in item && typeof item.content === "string"
          ? item.content.trim()
          : "";
      const role =
        "role" in item && (item.role === "user" || item.role === "assistant")
          ? item.role
          : null;

      if (!content || !role) {
        return null;
      }

      return {
        content: content.slice(0, 4000),
        role
      };
    })
    .filter((item): item is ChatbotApiMessage => item !== null)
    .slice(-12);
}

function getLatestUserMessage(messages: ChatbotApiMessage[]) {
  return (
    messages
      .slice()
      .reverse()
      .find((message) => message.role === "user")?.content ?? ""
  );
}

function looksLikeWeatherRequest(message: string) {
  const lowered = message.toLocaleLowerCase("vi-VN");
  const weatherCues = [
    "thời tiết",
    "thoi tiet",
    "nhiệt độ",
    "nhiet do",
    "gió",
    "gio",
    "độ ẩm",
    "do am"
  ];

  return weatherCues.some((weatherCue) => lowered.includes(weatherCue));
}

export function resolveEffectiveMode(
  mode: ChatMode,
  messages: ChatbotApiMessage[]
): ChatMode {
  if (mode === "travel") {
    return mode;
  }

  const latestUserMessage = getLatestUserMessage(messages);

  if (
    isWeatherQuestion(latestUserMessage) ||
    looksLikeWeatherRequest(latestUserMessage)
  ) {
    return "travel";
  }

  return mode;
}

export async function POST(request: Request) {
  const payload = ((await request.json().catch(() => null)) ??
    {}) as Partial<ChatbotApiRequest>;
  const mode = payload.mode;
  const messages = sanitizeMessages(payload.messages);

  if (!isChatMode(mode) || messages.length === 0) {
    return NextResponse.json(
      { reply: "Yêu cầu chatbot chưa hợp lệ." } satisfies ChatbotApiResponse,
      { status: 400 }
    );
  }

  const effectiveMode = resolveEffectiveMode(mode, messages);

  if (effectiveMode === "support") {
    const response = buildSupportReply(messages);

    return NextResponse.json(response satisfies ChatbotApiResponse);
  }

  const response = await buildTravelReply(messages);

  return NextResponse.json(response satisfies ChatbotApiResponse);
}
