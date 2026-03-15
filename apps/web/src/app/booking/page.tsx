import { SectionHeading } from "@/components/section-heading";
import { ancillaries, bookingSteps, fareComparisons } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

const bookingStepLabels = {
  done: "Đã chọn",
  current: "Đang nhập",
  upcoming: "Sắp tới"
} as const;

export default function BookingPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Đặt vé"
          title="Đặt vé theo từng bước rõ ràng từ chọn chuyến đến thanh toán"
          description="Chọn chuyến bay phù hợp, nhập thông tin hành khách, bổ sung dịch vụ cần thiết và hoàn tất thanh toán trong một luồng dễ theo dõi."
        />
        <div className="step-grid">
          {bookingSteps.map((step) => (
            <article
              key={step.title}
              className={`surface-card step-card step-${step.status}`}
            >
              <span className="pill">{bookingStepLabels[step.status]}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="section-gap" />
        <div className="section-split">
          <div>
            <SectionHeading
              eyebrow="Dịch vụ bổ trợ"
              title="Chọn thêm hành lý, chỗ ngồi và suất ăn theo đúng nhu cầu"
              description="Các dịch vụ được sắp theo ngữ cảnh chuyến bay để hành khách dễ chọn những tiện ích thật sự cần trước giờ khởi hành."
            />
            <div className="card-grid">
              {ancillaries.map((item) => (
                <article key={item.code} className="surface-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <strong>{formatCurrency(item.price)}</strong>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Tóm tắt thanh toán"
              title="Xem tổng tiền và quyền lợi vé trước khi xác nhận thanh toán"
              description="Giá vé, dịch vụ bổ sung và điều kiện đổi hoặc hoàn được trình bày cùng nhau để hành khách nắm rõ trước khi trả tiền."
            />
            <div className="stack-list">
              {fareComparisons.map((fare) => (
                <article key={fare.title} className="surface-card">
                  <h3>{fare.title}</h3>
                  <p>{fare.perks.join(" • ")}</p>
                  <strong>{formatCurrency(fare.price)}</strong>
                </article>
              ))}
              <article className="surface-card accent-card">
                <h3>Thanh toán an toàn</h3>
                <p>
                  Hỗ trợ mã thanh toán ngân hàng, thẻ và ví điện tử với cơ chế chống
                  ghi nhận trùng để hạn chế rủi ro thanh toán lặp.
                </p>
                <strong>Giữ chỗ còn 15:00</strong>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
