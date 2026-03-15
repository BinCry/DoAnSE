import { SectionHeading } from "@/components/section-heading";
import { manageActions, notifications, supportFaqs } from "@/lib/mock-data";

export default function ManageBookingPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero-card">
          <div>
            <span className="section-eyebrow">Quản lý đặt chỗ</span>
            <h1 className="page-title">Tra cứu đặt chỗ, đổi chuyến và bổ sung dịch vụ trong vài bước rõ ràng.</h1>
            <p className="page-hero-copy">
              Hành khách có thể xem lại hành trình, đổi hoặc hủy vé theo điều kiện,
              mua thêm hành lý, chọn chỗ ngồi và theo dõi các cập nhật liên quan đến chuyến bay.
            </p>
          </div>
          <div className="booking-summary-card">
            <span className="pill">Mã đặt chỗ K7M4Q2</span>
            <h3>Thành phố Hồ Chí Minh - Hà Nội</h3>
            <p>20/03/2026 · 09:45 · Phổ thông linh hoạt</p>
            <div className="assurance-row">
              <span className="assurance-chip">Giữ giá 15 phút</span>
              <span className="assurance-chip">Đủ điều kiện đổi chuyến</span>
            </div>
          </div>
        </div>

        <div className="section-gap" />
        <div className="lookup-card">
          <div className="field-grid compact-grid">
            <label className="field">
              <span>Mã đặt chỗ</span>
              <input defaultValue="K7M4Q2" />
            </label>
            <label className="field">
              <span>Email / số điện thoại</span>
              <input defaultValue="khachhang@auroraair.vn" />
            </label>
            <button type="button" className="button button-primary">
              Tra cứu đặt chỗ
            </button>
          </div>
        </div>

        <div className="section-gap" />
        <div className="card-grid card-grid-3">
          {manageActions.map((action) => (
            <article key={action.title} className="surface-card action-card">
              <h3>{action.title}</h3>
              <p>{action.description}</p>
              <strong>{action.rule}</strong>
            </article>
          ))}
        </div>

        <div className="section-gap" />
        <div className="section-split">
          <div>
            <SectionHeading
              eyebrow="Thông báo liên quan"
              title="Dòng thời gian đặt chỗ giúp khách không bỏ lỡ cập nhật quan trọng"
              description="Email, chuyến bay chậm, mở làm thủ tục và trạng thái thanh toán đều quy về một luồng xem lại dễ hiểu."
            />
            <div className="stack-list">
              {notifications.map((item) => (
                <article key={item.title} className="surface-card notification-card">
                  <span className="pill">{item.time}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Giải thích điều kiện"
              title="Điều kiện đổi và hoàn được giải thích rõ trước khi xác nhận"
              description="Thông tin minh bạch giúp hành khách đưa ra quyết định nhanh hơn và hạn chế phát sinh khiếu nại sau bán."
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
        </div>
      </div>
    </section>
  );
}
