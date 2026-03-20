import { describe, expect, it } from "vitest";

import { resolveEffectiveMode } from "@/app/api/chatbot/route";

describe("chatbot-route", () => {
  it("giu nguyen che do support voi cau hoi ho tro thong thuong", () => {
    expect(
      resolveEffectiveMode("support", [
        {
          role: "user",
          content: "Tôi muốn mua thêm hành lý ký gửi"
        }
      ])
    ).toBe("support");
  });

  it("tu chuyen sang travel khi nguoi dung hoi thoi tiet", () => {
    expect(
      resolveEffectiveMode("support", [
        {
          role: "user",
          content: "Thời tiết Hà Nội hôm nay thế nào?"
        }
      ])
    ).toBe("travel");
  });
});
