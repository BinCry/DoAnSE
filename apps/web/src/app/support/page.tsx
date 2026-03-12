import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { supportChannels, supportFaqs } from "@/lib/mock-data";

const airportCards = [
  "Nội Bài: mở quầy trước 2 giờ, khu vực C và D có quầy làm thủ tục tự động.",
  "Tân Sơn Nhất: cập nhật cửa ra tàu theo thời gian thực trên trang tình trạng chuyến bay.",
  "Đà Nẵng: ưu tiên khách có yêu cầu hỗ trợ đặc biệt qua bộ phận chăm sóc khách hàng trước chuyến."
];

export default function SupportPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="support-hero-grid">
          <div className="page-hero-card support-hero-card">
            <div>
              <span className="section-eyebrow">Trung tâm hỗ trợ</span>
              <h1 className="page-title">Hỗ trợ được tổ chức như một sản phẩm đa kênh, không chỉ là trang câu hỏi thường gặp.</h1>
              <p className="page-hero-copy">
                Trợ lý hỗ trợ, tổng đài, yêu cầu hỗ trợ, câu hỏi thường gặp và
                thông tin sân bay cùng nằm trong một trải nghiệm có cấu trúc rõ
                ràng cho khách và đội chăm sóc khách hàng.
              </p>
            </div>
            <div className="support-stat-panel">
              <div className="page-hero-stat">
                <span>Thời hạn xử lý ưu tiên</span>
                <strong>25'</strong>
              </div>
              <div className="page-hero-stat">
                <span>Tiếp nhận từ trợ lý hỗ trợ</span>
                <strong>1 chạm</strong>
              </div>
            </div>
          </div>
          <div className="support-media-card">
            <Image
              src="/images/danang-coast.jpg"
              alt="Hình nền du lịch hỗ trợ cho trang chăm sóc khách hàng"
              fill
              sizes="(max-width: 1180px) 100vw, 360px"
            />
            <div className="support-media-overlay">
              <span className="pill">Hỗ trợ hành khách</span>
              <h3>Khách cần gì trước giờ bay</h3>
              <p>Câu hỏi thường gặp, thông tin sân bay, điều kiện đổi vé và đường lên bộ phận chăm sóc khách hàng đều rõ ràng.</p>
            </div>
          </div>
        </div>

        <div className="section-gap" />
        <div className="card-grid card-grid-3">
          {supportChannels.map((channel) => (
            <article key={channel.title} className="surface-card promo-card">
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              <strong>{channel.channel}</strong>
            </article>
          ))}
        </div>

        <div className="section-gap" />
        <div className="section-split">
          <div>
            <SectionHeading
              eyebrow="Câu hỏi thường gặp"
              title="Câu trả lời phổ biến phải đủ tốt để trợ lý hỗ trợ và khu quản trị nội dung dùng chung"
              description="Khách tự giải quyết được càng nhiều thì trung tâm hỗ trợ càng nhẹ tải hơn."
            />
            <div className="stack-list">
              {supportFaqs.map((faq) => (
                <article key={faq.question} className="surface-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Thông tin sân bay"
              title="Những chi tiết nhỏ nhưng rất sát nhu cầu thật"
              description="Phần này giúp hành khách chuẩn bị tốt trước ngày bay và giảm phụ thuộc vào tổng đài."
            />
            <div className="stack-list">
              {airportCards.map((card) => (
                <article key={card} className="surface-card">
                  <p>{card}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
