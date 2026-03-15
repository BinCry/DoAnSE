import { SectionHeading } from "@/components/section-heading";
import { StatusChip } from "@/components/status-chip";
import { hienThiHanhTrinh, hienThiTenGoiGia } from "@/lib/display";
import { fareComparisons, flightResults } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

const toneMap = {
  scheduled: "neutral",
  on_time: "success",
  boarding: "info",
  delayed: "warning",
  departed: "neutral",
  landed: "success",
  cancelled: "danger"
} as const;

const labelMap = {
  scheduled: "Lên lịch",
  on_time: "Đúng giờ",
  boarding: "Đang lên máy bay",
  delayed: "Trễ",
  departed: "Đã khởi hành",
  landed: "Đã hạ cánh",
  cancelled: "Hủy"
} as const;

const filterBlocks = [
  "Khoảng giờ bay sáng, trưa, tối",
  "Giới hạn ngân sách theo tuyến",
  "Loại gói giá và hành lý đi kèm",
  "Chuyến gần hết chỗ",
  "Mở làm thủ tục sớm"
];

const insights = [
  { label: "Tuyến đang xem", value: "Thành phố Hồ Chí Minh - Hà Nội", compact: true },
  { label: "Khung ngày", value: "20/03 - 23/03", compact: true },
  { label: "Mức giá tốt nhất", value: formatCurrency(1490000), compact: false }
];

export default function SearchPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero-card search-page-hero">
          <div>
            <span className="section-eyebrow">Tìm chuyến bay</span>
            <h1 className="page-title">Chọn chuyến bay phù hợp theo giờ khởi hành, gói giá và ngân sách.</h1>
            <p className="page-hero-copy">
              So sánh nhanh giờ bay, thời lượng, số ghế còn lại và điều kiện gói giá
              để chốt hành trình phù hợp ngay từ bước tìm kiếm.
            </p>
          </div>
          <div className="page-hero-stat-grid">
            {insights.map((item) => (
              <article key={item.label} className="page-hero-stat">
                <span>{item.label}</span>
                <strong className={item.compact ? "stat-value-compact" : undefined}>
                  {item.value}
                </strong>
              </article>
            ))}
          </div>
        </div>

        <div className="section-gap" />
        <div className="search-layout">
          <aside className="surface-card sticky-card filter-card">
            <h3>Bộ lọc đề xuất</h3>
            <div className="filter-chip-list">
              {filterBlocks.map((item) => (
                <span key={item} className="assurance-chip">
                  {item}
                </span>
              ))}
            </div>
            <div className="filter-note">
              Bộ lọc ưu tiên các tiêu chí hành khách thường dùng để rút ngắn thời
              gian tìm chuyến bay trên những tuyến đông khách.
            </div>
          </aside>

          <div className="stack-list">
            {flightResults.map((flight) => (
              <article key={flight.code} className="surface-card result-card">
                <div className="result-top">
                  <div>
                    <span className="section-eyebrow">Chuyến bay {flight.code}</span>
                    <h3>
                      {hienThiHanhTrinh(flight.from, flight.to)}
                    </h3>
                    <p>{flight.duration}</p>
                  </div>
                  <StatusChip
                    tone={toneMap[flight.status]}
                    label={labelMap[flight.status]}
                  />
                </div>

                <div className="result-timeline">
                  <div className="timeline-stop">
                    <span>Khởi hành</span>
                    <strong>{flight.departureTime}</strong>
                  </div>
                  <div className="timeline-line" />
                  <div className="timeline-stop">
                    <span>Hạ cánh</span>
                    <strong>{flight.arrivalTime}</strong>
                  </div>
                </div>

                <div className="result-grid result-grid-rich">
                  <div>
                    <span>Gói giá</span>
                    <strong>{hienThiTenGoiGia(flight.fareFamily)}</strong>
                  </div>
                  <div>
                    <span>Còn lại</span>
                    <strong>{flight.seatsLeft} ghế</strong>
                  </div>
                  <div>
                    <span>Giá từ</span>
                    <strong>{formatCurrency(flight.price)}</strong>
                  </div>
                </div>

                <div className="result-actions">
                  <div className="assurance-row">
                    <span className="assurance-chip">Giữ chỗ 15 phút</span>
                    <span className="assurance-chip">Hiển thị điều kiện đổi hoặc hoàn</span>
                  </div>
                  <button type="button" className="button button-primary">
                    Chọn chuyến này
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="section-gap" />
        <SectionHeading
          eyebrow="So sánh gói giá"
          title="So sánh gói giá để chọn đúng nhu cầu của từng hành trình"
          description="Mỗi gói vé làm rõ quyền lợi về hành lý, đổi hoặc hoàn và lựa chọn chỗ ngồi để hành khách đưa ra quyết định ngay tại bước tìm chuyến."
        />
        <div className="card-grid card-grid-3">
          {fareComparisons.map((fare) => (
            <article key={fare.title} className="surface-card fare-card">
              <span className="pill">{fare.title}</span>
              <strong className="fare-price">{formatCurrency(fare.price)}</strong>
              <ul className="list-clean">
                {fare.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
