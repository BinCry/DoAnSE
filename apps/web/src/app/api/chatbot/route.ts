import { NextResponse } from "next/server";

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

  if (mode === "support") {
    const response = buildSupportReply(messages);

    return NextResponse.json(response satisfies ChatbotApiResponse);
  }

  const response = await buildTravelReply(messages);

  return NextResponse.json(response satisfies ChatbotApiResponse);
}
