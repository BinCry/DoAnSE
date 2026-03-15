import Link from "next/link";
import Image from "next/image";

import { FlightSearchPanel } from "@/components/flight-search-panel";
import { SectionHeading } from "@/components/section-heading";
import { StatusChip } from "@/components/status-chip";
import {
  destinations,
  featuredArticles,
  heroHighlights,
  promotions,
  quickServices,
  supportChannels
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

const heroStats = [
  { label: "Tỷ lệ lấp đầy trên tuyến trục", value: "92%", detail: "Cập nhật theo tình hình khai thác trong ngày" },
  { label: "Tốc độ xuất vé", value: "Dưới 60 giây", detail: "Sau khi phản hồi thanh toán thành công" },
  { label: "Yêu cầu hỗ trợ đang mở", value: "18", detail: "Ưu tiên phản hồi trong ngày đối với các tình huống cần hỗ trợ gấp" }
];

const liveOperations = [
  {
    title: "Bán vé công khai",
    note: "Tìm chuyến bay, xem giá và chọn tiện ích ngay từ trang đầu."
  },
  {
    title: "Tự phục vụ sau bán",
    note: "Tra cứu đặt chỗ, đổi chuyến, mua thêm dịch vụ và làm thủ tục trực tuyến."
  },
  {
    title: "Hỗ trợ trước giờ bay",
    note: "Theo dõi tình trạng chuyến bay, cửa ra tàu và những lưu ý cần thiết trước khi khởi hành."
  }
];

const journeyDeck = [
  {
    eyebrow: "Trải nghiệm hành khách",
    title: "Đặt vé, chuẩn bị hành trình và nhận hỗ trợ trong cùng một trải nghiệm xuyên suốt",
    summary:
      "Khuyến mãi, cẩm nang, thông tin sân bay và gợi ý điểm đến được sắp xếp theo đúng nhu cầu thực tế trước ngày bay."
  },
  {
    eyebrow: "Thông tin trước giờ bay",
    title: "Chuẩn bị hành trình chủ động hơn với những thông tin cần xem ngay trước ngày khởi hành",
    summary:
      "Làm thủ tục trực tuyến, tình trạng chuyến bay, lưu ý hành lý và kênh hỗ trợ được đặt gần nhau để hành khách tra cứu nhanh."
  }
];

const travelServiceMetrics = [
  { label: "Mở làm thủ tục", value: "24 giờ", detail: "Trước giờ khởi hành với chặng nội địa" },
  { label: "Đóng làm thủ tục", value: "60 phút", detail: "Áp dụng cho hành khách khởi hành từ sân bay nội địa" },
  { label: "Giữ chỗ", value: "15 phút", detail: "Sau khi chọn chuyến bay và trước khi hoàn tất thanh toán" },
  { label: "Tổng đài hỗ trợ", value: "1900 6868", detail: "Tiếp nhận đổi vé, hỗ trợ sau bán và yêu cầu khẩn" }
];

const travelerTopics = [
  "Quy định hành lý xách tay",
  "Điều kiện đổi hoặc hoàn vé",
  "Giấy tờ cần mang theo",
  "Hỗ trợ hành khách đặc biệt",
  "Thông tin sân bay",
  "Cập nhật cửa ra tàu"
];

const featuredDestinations = [
  ...destinations.map((destination) => ({
    ...destination,
    displayCity:
      destination.code === "SGN" ? "TP. Hồ Chí Minh" : destination.city
  })),
  {
    code: "CXR",
    city: "Nha Trang",
    displayCity: "Nha Trang",
    airport: "Cam Ranh",
    priceFrom: 1490000,
    highlights: ["Biển xanh trung tâm", "Combo nghỉ dưỡng", "Đưa đón sân bay thuận tiện"]
  },
  {
    code: "HUI",
    city: "Huế",
    displayCity: "Huế",
    airport: "Phú Bài",
    priceFrom: 1290000,
    highlights: ["Di sản cố đô", "Lịch trình cuối tuần", "Gợi ý tham quan nội thành"]
  }
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section home-hero-section">
        <div className="container hero-grid home-hero-grid">
          <div className="hero-copy hero-copy-rich home-hero-copy">
            <span className="section-eyebrow home-hero-eyebrow">Aurora Air</span>
            <h1>Đặt vé nội địa linh hoạt, quản lý hành trình thuận tiện từ trước đến sau chuyến bay.</h1>
            <p>
              Tìm chuyến bay theo giờ phù hợp, chọn gói giá rõ quyền lợi, bổ sung
              hành lý hoặc chỗ ngồi, làm thủ tục trực tuyến và nhận hỗ trợ nhanh trong
              cùng một trải nghiệm thống nhất.
            </p>
            <div className="hero-actions home-hero-actions">
              <Link href="/search" className="button button-primary home-hero-primary">
                Đặt vé ngay
              </Link>
              <Link href="/manage-booking" className="button button-secondary home-hero-secondary">
                Quản lý đặt chỗ
              </Link>
            </div>
            <div className="hero-stat-grid home-hero-stat-grid">
              {heroStats.map((item) => (
                <article key={item.label} className="hero-stat-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <div className="hero-photo-ribbon home-hero-photo-ribbon">
              <div className="hero-photo-card hero-photo-card-large">
                <Image
                  src="/images/airport-terminal.jpg"
                  alt="Máy bay đỗ tại nhà ga sân bay"
                  fill
                  sizes="(max-width: 820px) 100vw, 420px"
                />
              </div>
              <div className="hero-photo-card">
                <Image
                  src="/images/vietnam-airport.jpg"
                  alt="Cầu ống lồng tại sân bay Việt Nam"
                  fill
                  sizes="(max-width: 820px) 100vw, 220px"
                />
              </div>
            </div>
          </div>
          <div className="hero-panel-stack home-hero-panel-stack">
            <div className="home-hero-search-shell">
              <FlightSearchPanel />
            </div>
            <div className="hero-glass-board home-hero-board">
              <div className="hero-glass-head">
                <span className="pill">Vận hành trực tuyến</span>
                <StatusChip tone="success" label="Ổn định" />
              </div>
              <div className="hero-glass-list">
                {heroHighlights.map((item) => (
                  <article key={item} className="hero-highlight-row">
                    <span className="dot" />
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ops-strip">
        <div className="container ops-strip-grid">
          {liveOperations.map((item) => (
            <article key={item.title} className="ops-strip-card">
              <span className="pill">{item.title}</span>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="editorial-grid">
            <div>
              <SectionHeading
                eyebrow="Tiện ích nhanh"
                title="Những tiện ích hành khách cần nhất được đưa lên ngay từ đầu hành trình"
                description="Mua thêm hành lý, đổi chỗ ngồi, làm thủ tục trực tuyến và tra cứu đặt chỗ đều nằm ở lớp điều hướng đầu để thao tác nhanh trên cả máy tính lẫn điện thoại."
              />
              <div className="quick-grid">
                {quickServices.map((service) => (
                  <Link key={service.title} href={service.href} className="feature-card feature-card-rich">
                    <div className="feature-card-top">
                      <span className="pill">Tiện ích</span>
                      <strong>↗</strong>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.subtitle}</p>
                    <span>Xem chi tiết</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="spotlight-column">
              {journeyDeck.map((item) => (
                <article key={item.title} className="spotlight-card">
                  <span className="section-eyebrow">{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft home-destination-section">
        <div className="container">
          <SectionHeading
            eyebrow="Điểm đến & chiến dịch"
            title="Khám phá các đường bay nội địa nổi bật cho kỳ nghỉ, công tác và du lịch ngắn ngày"
            description="Mỗi điểm đến đi kèm mức giá khởi điểm, sân bay khai thác và các gợi ý nổi bật để hành khách có thêm căn cứ trước khi chọn hành trình."
          />
          <div className="destination-editorial-grid home-destination-grid">
            {featuredDestinations.map((destination, index) => (
              <article
                key={destination.code}
                className={`destination-card destination-card-rich home-destination-card destination-card-${index + 1}`}
              >
                <div className="destination-overlay home-destination-overlay">
                  <div className="destination-top home-destination-top">
                    <div>
                      <strong>{destination.displayCity}</strong>
                      <p>{destination.airport}</p>
                    </div>
                    <span className="pill">Điểm đến nổi bật</span>
                  </div>
                  <div className="destination-bottom home-destination-bottom">
                    <h3>{formatCurrency(destination.priceFrom)}</h3>
                    <ul className="list-clean home-destination-list">
                      {destination.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-split">
          <div>
          <SectionHeading
            eyebrow="Ưu đãi & nội dung"
            title="Ưu đãi theo mùa, cẩm nang hành trình và hướng dẫn trước chuyến bay"
            description="Khuyến mãi hỗ trợ chốt đặt vé, trong khi cẩm nang và hướng dẫn giúp hành khách chuẩn bị tốt hơn trước khi đến sân bay."
          />
            <div className="card-grid card-grid-3">
              {promotions.map((promotion) => (
                <article key={promotion.title} className="surface-card promo-card">
                  <span className="pill">{promotion.tag}</span>
                  <h3>{promotion.title}</h3>
                  <p>{promotion.summary}</p>
                  <button type="button" className="text-button">
                    {promotion.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Cẩm nang & hỗ trợ"
              title="Thông tin đồng hành rõ ràng ở từng chặng của chuyến đi"
              description="Từ mẹo đi sân bay, quy định đổi vé đến cẩm nang điểm đến, mọi nội dung đều được sắp theo nhu cầu tra cứu thực tế để hành khách dễ tìm và dễ dùng."
            />
            <div className="stack-list">
              {featuredArticles.map((article) => (
                <article key={article.slug} className="surface-card article-card">
                  <span className="pill">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <small>{article.readTime}</small>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="Chuẩn bị trước giờ bay"
            title="Những thông tin hành khách nên xem trước khi ra sân bay"
            description="Từ thời gian làm thủ tục, quy định hành lý đến kênh hỗ trợ và tình trạng chuyến bay, mọi thông tin quan trọng đều được gom lại để tra cứu nhanh."
          />
          <div className="command-grid">
            <div className="command-metrics">
              {travelServiceMetrics.map((metric) => (
                <article key={metric.label} className="glass-card metric-card-dark">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <p>{metric.detail}</p>
                </article>
              ))}
            </div>
            <div className="command-side">
              <article className="glass-card command-panel">
                <h3>Hành khách thường quan tâm</h3>
                <div className="role-chip-cloud">
                  {travelerTopics.map((topic) => (
                    <span key={topic} className="role-chip">
                      {topic}
                    </span>
                  ))}
                </div>
                <p>
                  Những mục được tra cứu nhiều nhất trước ngày bay được đưa lên rõ ràng
                  để hành khách không phải tìm qua nhiều lớp điều hướng.
                </p>
              </article>
              <article className="glass-card command-panel">
                <h3>Kênh hỗ trợ đa lớp</h3>
                <div className="stack-list compact-stack">
                  {supportChannels.map((channel) => (
                    <div key={channel.title} className="support-compact-item">
                      <strong>{channel.title}</strong>
                      <p>{channel.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .ops-strip {
          margin-top: 18px;
          padding-bottom: 34px;
        }

        .ops-strip-grid,
        .editorial-grid,
        .section-split,
        .command-grid {
          gap: 28px;
        }

        .quick-grid,
        .card-grid,
        .stack-list {
          gap: 20px;
        }

        .section {
          padding: 76px 0;
        }

        .section-heading {
          max-width: 780px;
          margin-bottom: 34px;
        }

        .section-heading h2 {
          color: rgba(8, 33, 58, 0.96);
          font-size: clamp(2.04rem, 3vw, 2.82rem);
          line-height: 1.05;
          letter-spacing: -0.034em;
          text-wrap: balance;
        }

        .section-dark .section-heading h2 {
          color: rgba(255, 248, 239, 0.97);
          text-shadow: 0 8px 24px rgba(7, 24, 41, 0.18);
        }

        .section-heading p {
          max-width: 68ch;
          color: rgba(16, 45, 78, 0.76);
          font-size: 1.01rem;
          line-height: 1.72;
        }

        .section-dark .section-heading p {
          color: rgba(247, 243, 234, 0.9);
          max-width: 70ch;
        }

        .feature-card h3,
        .spotlight-card h3,
        .promo-card h3,
        .article-card h3,
        .command-panel h3 {
          color: rgba(8, 33, 58, 0.95);
          font-size: clamp(1.18rem, 1.45vw, 1.34rem);
          line-height: 1.2;
          letter-spacing: -0.024em;
        }

        .feature-card p,
        .spotlight-card p,
        .promo-card p,
        .article-card p,
        .ops-strip-card p,
        .command-panel p {
          color: rgba(16, 45, 78, 0.74);
          font-size: 0.97rem;
          line-height: 1.7;
        }

        .home-hero-section {
          padding: 72px 0 46px;
        }

        .home-hero-section::before {
          background:
            radial-gradient(circle at 12% 22%, rgba(203, 225, 247, 0.38), transparent 22%),
            radial-gradient(circle at 84% 12%, rgba(83, 148, 217, 0.18), transparent 18%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.16), transparent 60%);
        }

        .home-hero-grid {
          grid-template-columns: minmax(0, 1.16fr) minmax(390px, 0.84fr);
          gap: 56px;
          align-items: start;
        }

        .home-hero-copy {
          display: grid;
          align-content: start;
          gap: 26px;
          padding: 48px 0 18px;
        }

        .home-hero-eyebrow {
          width: fit-content;
          min-height: 36px;
          margin-bottom: 0;
          padding: 0 14px;
          border-radius: 999px;
          border: 1px solid rgba(18, 61, 105, 0.12);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.98),
            rgba(231, 243, 255, 0.92)
          );
          color: rgba(18, 69, 120, 0.9);
          box-shadow: 0 12px 26px rgba(18, 61, 105, 0.06);
        }

        .home-hero-copy h1 {
          max-width: 11.8ch;
          color: rgba(8, 33, 58, 0.97);
          font-size: clamp(3.2rem, 5.3vw, 4.92rem);
          line-height: 1.02;
          letter-spacing: -0.042em;
          text-wrap: balance;
        }

        .home-hero-copy > p {
          max-width: 64ch;
          margin: 0;
          color: rgba(16, 45, 78, 0.8);
          font-size: clamp(1.02rem, 1.12vw, 1.1rem);
          line-height: 1.76;
        }

        .home-hero-actions {
          gap: 14px;
          margin-top: 2px;
        }

        .home-hero-primary,
        .home-hero-secondary {
          min-height: 56px;
          padding: 0 24px;
          border-radius: 999px;
        }

        .home-hero-primary {
          border: 1px solid rgba(255, 255, 255, 0.46);
          background:
            radial-gradient(circle at 24% 20%, rgba(255, 255, 255, 0.32), transparent 34%),
            linear-gradient(135deg, #154f87 0%, #2471bd 52%, #4b9ee8 100%);
          box-shadow:
            0 18px 34px rgba(20, 78, 135, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.34);
        }

        .home-hero-secondary {
          color: rgba(12, 56, 100, 0.95);
          border: 1px solid rgba(18, 61, 105, 0.14);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.98),
            rgba(236, 245, 255, 0.92)
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.88),
            0 14px 30px rgba(18, 61, 105, 0.08);
        }

        .home-hero-stat-grid {
          gap: 16px;
          margin-top: 4px;
        }

        .home-hero-stat-grid .hero-stat-card {
          padding: 20px 22px;
          border-color: rgba(18, 61, 105, 0.1);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.92),
            rgba(243, 248, 253, 0.84)
          );
          box-shadow: 0 20px 40px rgba(18, 61, 105, 0.08);
        }

        .home-hero-stat-grid .hero-stat-card span,
        .home-hero-stat-grid .hero-stat-card p {
          color: rgba(16, 45, 78, 0.72);
        }

        .home-hero-photo-ribbon {
          gap: 18px;
          margin-top: 4px;
        }

        .home-hero-photo-ribbon .hero-photo-card {
          border: 1px solid rgba(18, 61, 105, 0.08);
          box-shadow: 0 24px 44px rgba(18, 61, 105, 0.12);
        }

        .home-hero-photo-ribbon .hero-photo-card::after {
          background: linear-gradient(180deg, rgba(10, 27, 46, 0.04), rgba(10, 27, 46, 0.38));
        }

        .home-hero-panel-stack {
          gap: 22px;
          padding-top: 30px;
        }

        .home-hero-search-shell .search-panel {
          padding: 30px;
          border-radius: 30px;
          border-color: rgba(18, 61, 105, 0.09);
          background:
            radial-gradient(circle at top right, rgba(168, 206, 241, 0.14), transparent 28%),
            radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.9), transparent 28%),
            linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(246, 250, 254, 0.97));
          box-shadow: 0 20px 42px rgba(18, 61, 105, 0.08);
        }

        .home-hero-search-shell .search-panel-head {
          gap: 20px;
          margin-bottom: 18px;
        }

        .home-hero-search-shell .search-panel-head h2 {
          color: rgba(10, 35, 60, 0.95);
          font-size: 1.38rem;
        }

        .home-hero-search-shell .panel-kicker,
        .home-hero-search-shell .search-note,
        .home-hero-search-shell .field span,
        .home-hero-search-shell .field small,
        .home-hero-search-shell .search-footer p,
        .home-hero-search-shell .search-mini-metrics span {
          color: rgba(16, 45, 78, 0.72);
        }

        .home-hero-search-shell .search-mini-metrics div {
          border: 1px solid rgba(18, 61, 105, 0.1);
          background: linear-gradient(
            135deg,
            rgba(244, 249, 255, 0.94),
            rgba(230, 240, 252, 0.82)
          );
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);
        }

        .home-hero-search-shell .toggle-group {
          gap: 10px;
          padding: 8px;
          background: rgba(18, 61, 105, 0.07);
        }

        .home-hero-search-shell .field input,
        .home-hero-search-shell .field select {
          border-color: rgba(18, 61, 105, 0.14);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .home-hero-search-shell .route-field input {
          color: rgba(10, 35, 60, 0.96);
        }

        .home-hero-search-shell .assurance-chip {
          border: 1px solid rgba(18, 61, 105, 0.1);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.94),
            rgba(236, 245, 255, 0.88)
          );
          color: rgba(12, 56, 100, 0.86);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);
        }

        .home-hero-search-shell .search-footer {
          margin-top: 24px;
        }

        .home-hero-search-shell .search-footer .button-primary {
          min-height: 54px;
          padding: 0 22px;
          border: 1px solid rgba(255, 255, 255, 0.44);
          background:
            radial-gradient(circle at 24% 20%, rgba(255, 255, 255, 0.32), transparent 34%),
            linear-gradient(135deg, #154f87 0%, #2471bd 52%, #4b9ee8 100%);
          box-shadow:
            0 18px 34px rgba(20, 78, 135, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.34);
        }

        .home-hero-board {
          padding: 24px 24px 22px;
          border-color: rgba(18, 61, 105, 0.1);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.98),
            rgba(243, 248, 253, 0.94)
          );
          box-shadow: 0 18px 38px rgba(18, 61, 105, 0.08);
        }

        .home-hero-board .hero-glass-head {
          margin-bottom: 18px;
        }

        .home-hero-board .pill {
          border: 1px solid rgba(18, 61, 105, 0.12);
          background: linear-gradient(
            135deg,
            rgba(247, 251, 255, 0.96),
            rgba(228, 239, 252, 0.88)
          );
          color: rgba(12, 56, 100, 0.88);
        }

        .home-hero-board .hero-highlight-row {
          padding: 10px 0;
        }

        .home-hero-board .hero-highlight-row + .hero-highlight-row {
          border-top: 1px solid rgba(18, 61, 105, 0.08);
        }

        .home-hero-board .hero-highlight-row p {
          color: rgba(16, 45, 78, 0.8);
        }

        .home-hero-board .dot {
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #2471bd, #6cb4f0);
          box-shadow: 0 0 0 4px rgba(36, 113, 189, 0.12);
        }

        .home-destination-section {
          padding-top: 82px;
        }

        .home-destination-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .home-destination-card {
          position: relative;
          isolation: isolate;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 26px 52px rgba(18, 61, 105, 0.13),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .home-destination-card.destination-card-1,
        .home-destination-card.destination-card-4 {
          grid-column: span 1;
          min-height: 320px;
        }

        .home-destination-card.destination-card-5 {
          background:
            linear-gradient(160deg, rgba(12, 34, 61, 0.2), rgba(12, 34, 61, 0.76)),
            url("/images/airport-terminal.jpg") center/cover,
            linear-gradient(135deg, #4f7193, #173253);
        }

        .home-destination-card.destination-card-6 {
          background:
            linear-gradient(160deg, rgba(12, 34, 61, 0.18), rgba(12, 34, 61, 0.74)),
            url("/images/danang-sunset.jpg") center/cover,
            linear-gradient(135deg, #8a6947, #16395d);
        }

        .home-destination-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 14%, rgba(255, 255, 255, 0.14), transparent 28%),
            radial-gradient(circle at 82% 0%, rgba(245, 209, 141, 0.12), transparent 24%);
          pointer-events: none;
          z-index: 0;
        }

        .home-destination-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(7, 24, 41, 0.04) 12%,
            rgba(7, 24, 41, 0.24) 40%,
            rgba(7, 24, 41, 0.64) 72%,
            rgba(7, 24, 41, 0.88) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        .home-destination-overlay {
          position: relative;
          z-index: 1;
          padding: 30px;
          background:
            radial-gradient(circle at top right, rgba(255, 255, 255, 0.16), transparent 24%),
            linear-gradient(180deg, rgba(8, 28, 48, 0) 18%, rgba(8, 28, 48, 0.26) 58%, rgba(8, 28, 48, 0.52) 100%);
        }

        .home-destination-top {
          gap: 18px;
          align-items: flex-start;
        }

        .home-destination-top > div {
          min-width: 0;
        }

        .home-destination-top strong {
          display: block;
          margin-bottom: 6px;
          color: rgba(255, 252, 246, 1);
          font-size: clamp(1.34rem, 1.7vw, 1.62rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          white-space: nowrap;
          text-shadow: 0 6px 20px rgba(7, 24, 41, 0.24);
        }

        .home-destination-top p {
          margin: 0;
          color: rgba(250, 246, 239, 0.94);
          line-height: 1.55;
          text-shadow: 0 4px 14px rgba(7, 24, 41, 0.2);
        }

        .home-destination-card .pill {
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: linear-gradient(
            135deg,
            rgba(11, 38, 66, 0.54),
            rgba(255, 255, 255, 0.14)
          );
          color: rgba(255, 251, 244, 0.98);
          white-space: nowrap;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            0 10px 22px rgba(7, 24, 41, 0.16);
          backdrop-filter: blur(8px);
        }

        .home-destination-bottom {
          display: grid;
          gap: 16px;
        }

        .home-destination-bottom h3 {
          margin-bottom: 0;
          color: #fff1c3;
          font-size: clamp(1.65rem, 2.8vw, 2.22rem);
          line-height: 1;
          letter-spacing: -0.04em;
          text-shadow: 0 8px 24px rgba(7, 24, 41, 0.28);
        }

        .home-destination-list {
          display: grid;
          gap: 10px;
          padding: 16px 18px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: linear-gradient(
            180deg,
            rgba(9, 31, 52, 0.18),
            rgba(9, 31, 52, 0.44)
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 16px 30px rgba(7, 24, 41, 0.14);
          backdrop-filter: blur(8px);
        }

        .home-destination-list li {
          color: rgba(255, 248, 239, 0.98);
          text-shadow: 0 3px 12px rgba(7, 24, 41, 0.18);
        }

        .home-destination-list li::before {
          box-shadow: 0 0 0 4px rgba(245, 209, 141, 0.08);
        }

        @media (max-width: 1180px) {
          .home-hero-grid {
            grid-template-columns: 1fr;
            gap: 34px;
          }

          .home-hero-copy {
            padding-bottom: 0;
          }

          .home-hero-panel-stack {
            padding-top: 0;
          }

          .home-hero-copy h1 {
            max-width: 13.5ch;
          }

          .home-destination-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 820px) {
          .section {
            padding: 64px 0;
          }

          .section-heading {
            margin-bottom: 28px;
          }

          .home-hero-section {
            padding: 40px 0 28px;
          }

          .home-hero-copy {
            gap: 18px;
            padding: 12px 0 4px;
          }

          .home-hero-copy h1 {
            max-width: none;
          }

          .home-hero-actions {
            margin-top: 0;
          }

          .home-hero-search-shell .search-panel {
            padding: 24px;
            border-radius: 24px;
          }

          .home-hero-search-shell .toggle-group {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px;
            padding: 6px;
            border-radius: 22px;
            overflow: hidden;
          }

          .home-hero-search-shell .toggle {
            min-height: 46px;
            padding: 10px 12px;
            border-radius: 16px;
            line-height: 1.3;
            white-space: normal;
            overflow-wrap: anywhere;
            text-wrap: balance;
          }

          .home-hero-search-shell .toggle:last-child {
            grid-column: 1 / -1;
          }

          .home-destination-overlay {
            padding: 24px;
          }
        }

        @media (max-width: 520px) {
          .home-hero-eyebrow {
            min-height: 34px;
            padding: 0 12px;
          }

          .home-hero-primary,
          .home-hero-secondary {
            min-height: 52px;
          }

          .home-hero-stat-grid {
            gap: 14px;
          }

          .home-hero-search-shell .toggle-group {
            grid-template-columns: 1fr;
          }

          .home-hero-search-shell .toggle:last-child {
            grid-column: auto;
          }

          .home-destination-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .home-destination-card {
            border-radius: 26px;
          }

          .home-destination-overlay {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}
