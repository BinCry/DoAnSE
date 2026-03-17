export type ChatMode = "support" | "travel";

export type ChatAuthor = "user" | "assistant";

export interface ChatbotAction {
  href: string;
  label: string;
}

export interface ChatbotApiMessage {
  content: string;
  role: ChatAuthor;
}

export interface ChatbotApiRequest {
  messages: ChatbotApiMessage[];
  mode: ChatMode;
}

export interface ChatbotApiResponse {
  actions?: ChatbotAction[];
  reply: string;
}

export const chatbotModeOrder: ChatMode[] = ["support", "travel"];

export const chatbotModeConfig = {
  support: {
    description: "Giải đáp nhanh về đặt chỗ, check-in, hành lý và kênh hỗ trợ",
    emptyLabel:
      "Bạn có thể hỏi về mã đặt chỗ, hành lý, đổi vé, check-in hoặc liên hệ hỗ trợ.",
    label: "Hỗ trợ khách hàng",
    placeholder: "Ví dụ: Đổi vé sau thanh toán",
    prompts: [
      "Tôi muốn làm thủ tục trực tuyến thì cần gì?",
      "Tôi cần mua thêm hành lý ký gửi",
      "Làm sao để tra cứu mã đặt chỗ?",
      "Chuyến bay bị chậm thì nên kiểm tra ở đâu?"
    ],
    submitLabel: "Gửi hỗ trợ",
    welcome:
      "Xin chào, mình đang ở chế độ hỗ trợ khách hàng. Bạn cứ hỏi về đặt chỗ, đổi vé, check-in, hành lý hoặc cách liên hệ nhân viên hỗ trợ nhé."
  },
  travel: {
    description: "Gợi ý điểm đến, lịch trình và ý tưởng nghỉ ngơi theo nhu cầu của bạn",
    emptyLabel:
      "Hãy nói điểm đi, ngân sách, số ngày hoặc kiểu trải nghiệm bạn muốn để mình gợi ý sát hơn.",
    label: "Gợi ý du lịch",
    placeholder: "Ví dụ: Đi biển 3N2Đ từ TP.HCM",
    prompts: [
      "Gợi ý đi biển 3 ngày 2 đêm từ TP.HCM",
      "Đi đâu ở miền Bắc vào tháng 4 cho cặp đôi?",
      "Gợi ý điểm đến trong nước dưới 5 triệu/người",
      "Nơi phù hợp cho gia đình có trẻ nhỏ dịp cuối tuần"
    ],
    submitLabel: "Nhờ AI gợi ý",
    welcome:
      "Mình đang ở chế độ gợi ý du lịch. Bạn có thể nói ngân sách, số ngày, điểm khởi hành hoặc kiểu trải nghiệm mong muốn để mình đề xuất điểm đến phù hợp."
  }
} as const satisfies Record<
  ChatMode,
  {
    description: string;
    emptyLabel: string;
    label: string;
    placeholder: string;
    prompts: string[];
    submitLabel: string;
    welcome: string;
  }
>;
