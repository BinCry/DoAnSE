import { SectionHeading } from "@/components/section-heading";
import { ancillaries, bookingSteps, fareComparisons } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export default function BookingPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Đặt vé"
          title="Một luồng đặt vé nhiều bước nhưng không gây quá tải"
          description="Mỗi bước chỉ tập trung một quyết định chính: chọn chuyến, điền hành khách, thêm dịch vụ và thanh toán."
        />
        <div className="step-grid">
          {bookingSteps.map((step) => (
            <article
              key={step.title}
              className={`surface-card step-card step-${step.status}`}
            >
              <span className="pill">{step.status}</span>
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
              title="Đề xuất mua thêm đúng lúc, đúng ngữ cảnh"
              description="Không bán tràn lan. Hệ thống hiển thị dịch vụ dựa trên tuyến bay, gói vé và hạn cắt của từng dịch vụ."
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
              title="Cùng lúc hiển thị giá vé, add-on và điều kiện đổi/hoàn"
              description="Khách nhìn một lần là hiểu tổng tiền và những gì được phép làm sau khi thanh toán."
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
                  Hỗ trợ mã thanh toán ngân hàng, thẻ, ví điện tử và khóa chống lặp giao dịch để
                  tránh thanh toán lặp.
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
