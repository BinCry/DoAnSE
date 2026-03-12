"use client";

import { useState } from "react";

const quickPrompts = [
  "Tra cứu đặt chỗ",
  "Đổi chuyến",
  "Hành lý trả trước",
  "Gặp chăm sóc khách hàng"
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-root">
      {isOpen ? (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <strong>Trợ lý Aurora</strong>
              <p>Câu hỏi thường gặp, tra cứu và mở yêu cầu hỗ trợ.</p>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng trợ lý hỗ trợ"
            >
              ×
            </button>
          </div>
          <div className="chatbot-body">
            <div className="chat-message chat-message-bot">
              Xin chào. Tôi có thể hướng dẫn đặt vé, kiểm tra đặt chỗ hoặc chuyển
              sang nhân viên chăm sóc khách hàng nếu bạn cần người thật.
            </div>
            <div className="chat-prompt-grid">
              {quickPrompts.map((prompt) => (
                <button key={prompt} type="button" className="prompt-chip">
                  {prompt}
                </button>
              ))}
            </div>
            <div className="chat-message chat-message-user">
              Nếu giao dịch bị treo thì có bị thanh toán 2 lần không?
            </div>
            <div className="chat-message chat-message-bot">
              Hệ thống dùng khóa chống lặp giao dịch và đối soát phản hồi thanh toán
              nên không nhân đôi giao dịch. Tôi có thể mở yêu cầu hỗ trợ nếu bạn
              cần kiểm tra chi tiết.
            </div>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className="chatbot-button"
        onClick={() => setIsOpen((value) => !value)}
      >
        Trợ lý hỗ trợ
      </button>
    </div>
  );
}
