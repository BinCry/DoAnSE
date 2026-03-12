import { SectionHeading } from "@/components/section-heading";
import { manageActions, notifications, supportFaqs } from "@/lib/mock-data";

export default function ManageBookingPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero-card">
          <div>
            <span className="section-eyebrow">Quản lý đặt chỗ</span>
            <h1 className="page-title">Khu tự phục vụ được làm như một trung tâm điều khiển đặt chỗ.</h1>
            <p className="page-hero-copy">
              Khách có thể tra cứu, đổi chuyến, hoàn/hủy, mua thêm dịch vụ và xem
              mọi cập nhật vận hành ngay trong cùng một không gian.
            </p>
          </div>
          <div className="booking-summary-card">
            <span className="pill">Mã đặt chỗ A6C2P1</span>
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
              <input defaultValue="A6C2P1" />
            </label>
            <label className="field">
              <span>Email / số điện thoại</span>
              <input defaultValue="khachhang@aurora.vn" />
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
              title="Khu tự phục vụ luôn đi kèm giải thích điều kiện đổi và hoàn"
              description="Càng minh bạch điều kiện thì càng giảm va chạm với bộ phận chăm sóc khách hàng."
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
