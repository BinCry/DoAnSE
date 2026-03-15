"use client";

import { useState } from "react";

const quickPrompts = [
  "Tra cứu bằng mã đặt chỗ",
  "Làm thủ tục 24h - 60 phút",
  "Mua thêm hành lý",
  "Đổi hoặc hoàn vé"
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-root">
      {isOpen ? (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <strong>Trợ lý Vietnam Airlines</strong>
              <p>Hỗ trợ tra cứu đặt chỗ, làm thủ tục trực tuyến và kết nối chuyên viên hỗ trợ khi cần.</p>
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
              Xin chào. Tôi có thể hỗ trợ bạn tra cứu hành trình bằng mã đặt chỗ,
              kiểm tra thời gian làm thủ tục trực tuyến, hướng dẫn mua thêm hành lý
              hoặc kết nối tới chuyên viên hỗ trợ.
            </div>
            <div className="chat-prompt-grid">
              {quickPrompts.map((prompt) => (
                <button key={prompt} type="button" className="prompt-chip">
                  {prompt}
                </button>
              ))}
            </div>
            <div className="chat-message chat-message-user">
              Tôi muốn làm thủ tục online thì cần chuẩn bị gì?
            </div>
            <div className="chat-message chat-message-bot">
              Bạn chỉ cần mã đặt chỗ và họ hành khách như trên vé. Làm thủ tục
              trực tuyến hiện mở từ 24 giờ và đóng trước 60 phút so với giờ khởi
              hành. Nếu có hành lý ký gửi hoặc cần hỗ trợ đặc biệt, bạn vẫn nên
              đến quầy làm thủ tục sớm để được hỗ trợ thêm.
            </div>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className="chatbot-button"
        onClick={() => setIsOpen((value) => !value)}
      >
        Hỗ trợ nhanh
      </button>
    </div>
  );
}
