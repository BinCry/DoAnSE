"use client";

import { useState } from "react";

const quickPrompts = [
  "Tra cứu đặt chỗ",
  "Điều kiện đổi chuyến",
  "Mua thêm hành lý",
  "Gặp nhân viên hỗ trợ"
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
              <p>Hỗ trợ tra cứu nhanh, giải đáp FAQ và chuyển tiếp sang nhân viên khi cần.</p>
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
              Xin chào. Tôi có thể hỗ trợ bạn kiểm tra mã đặt chỗ, hướng dẫn đổi
              chuyến, giải thích điều kiện vé hoặc kết nối sang bộ phận chăm sóc
              khách hàng.
            </div>
            <div className="chat-prompt-grid">
              {quickPrompts.map((prompt) => (
                <button key={prompt} type="button" className="prompt-chip">
                  {prompt}
                </button>
              ))}
            </div>
            <div className="chat-message chat-message-user">
              Nếu thanh toán bị treo thì có bị ghi nhận hai lần không?
            </div>
            <div className="chat-message chat-message-bot">
              Hệ thống dùng khóa chống trùng giao dịch và đối soát phản hồi
              thanh toán trước khi xuất vé. Nếu bạn muốn, tôi có thể mở yêu cầu
              hỗ trợ để kiểm tra chi tiết theo mã đặt chỗ.
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
