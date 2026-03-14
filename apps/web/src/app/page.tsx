import Link from "next/link";
import Image from "next/image";

import { FlightSearchPanel } from "@/components/flight-search-panel";
import { SectionHeading } from "@/components/section-heading";
import { StatusChip } from "@/components/status-chip";
import {
  backofficeMetrics,
  destinations,
  featuredArticles,
  heroHighlights,
  promotions,
  quickServices,
  roleRules,
  supportChannels
} from "@/lib/mock-data";
import { ROLE_LABELS } from "@/lib/access-control";
import { formatCurrency } from "@/lib/format";

const heroStats = [
  { label: "Tỷ lệ lấp đầy trên tuyến trục", value: "92%", detail: "Dùng chung cho website và điều hành" },
  { label: "Tốc độ xuất vé", value: "Dưới 60 giây", detail: "Sau khi phản hồi thanh toán thành công" },
  { label: "Yêu cầu hỗ trợ đang mở", value: "18", detail: "Trợ lý hỗ trợ đẩy sang bộ phận chăm sóc khách hàng theo thời hạn xử lý" }
];

const liveOperations = [
  {
    title: "Bán vé công khai",
    note: "Khối tìm vé, lịch giá và tiện ích nhanh luôn nằm ở tầng đầu."
  },
  {
    title: "Tự phục vụ sau bán",
    note: "Đổi chuyến, hoàn hoặc hủy, mua thêm dịch vụ và làm thủ tục trực tuyến."
  },
  {
    title: "Điều hành nội bộ",
    note: "Bảng điều hành tài chính, vận hành, quản trị nội dung và nhật ký kiểm soát dùng cùng nguồn dữ liệu."
  }
];

const journeyDeck = [
  {
    eyebrow: "Trải nghiệm hành khách",
    title: "Website vừa bán vé vừa dẫn dắt hành trình của hành khách rõ ràng",
    summary:
      "Các khối khuyến mãi, cẩm nang, thông tin sân bay và điểm đến không đứng rời rạc mà cùng kéo khách về hành động chính."
  },
  {
    eyebrow: "Điều hành nội bộ",
    title: "Khu điều hành được trình bày rõ như một phần bắt buộc của hệ thống",
    summary:
      "Người dùng nội bộ thấy ngay doanh thu, tỷ lệ lấp đầy, thời hạn xử lý hỗ trợ, chuyến bay chậm hoặc hủy và nội dung vận hành trong cùng một mạch."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section home-hero-section">
        <div className="container hero-grid home-hero-grid">
          <div className="hero-copy hero-copy-rich home-hero-copy">
            <span className="section-eyebrow home-hero-eyebrow">Aurora Air</span>
            <h1>Website bán vé máy bay nội địa với đầy đủ mua vé, tự phục vụ và điều hành.</h1>
            <p>
              Giao diện tập trung hoàn toàn vào đề tài bán vé máy bay: tìm chuyến
              bay, giá vé, dịch vụ bổ trợ, làm thủ tục trực tuyến, quản lý đặt chỗ, hỗ trợ khách
              hàng và khu vận hành nội bộ.
            </p>
            <div className="hero-actions home-hero-actions">
              <Link href="/search" className="button button-primary home-hero-primary">
                Đặt vé ngay
              </Link>
              <Link href="/backoffice" className="button button-secondary home-hero-secondary">
                Mở điều hành
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
                title="Những chi tiết nhỏ nhưng có sức nặng chuyển đổi rất lớn"
                description="Hành lý, làm thủ tục, trợ lý hỗ trợ, nâng hạng và quản lý đặt chỗ được đẩy lên đầu để khách không phải đào trong menu sâu."
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
            title="Trang chủ giờ có cảm giác biên tập như website hãng bay thật"
            description="Dải nội dung này kết hợp điểm đến, ưu đãi và mức giá khởi điểm để tạo cảm giác vừa truyền cảm hứng vừa sẵn sàng chuyển đổi."
          />
          <div className="destination-editorial-grid home-destination-grid">
            {destinations.map((destination, index) => (
              <article
                key={destination.code}
                className={`destination-card destination-card-rich home-destination-card destination-card-${index + 1}`}
              >
                <div className="destination-overlay home-destination-overlay">
                  <div className="destination-top home-destination-top">
                    <div>
                      <strong>{destination.city}</strong>
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
            title="Khuyến mãi, cẩm nang và hướng dẫn được dệt cùng một mạch"
            description="Mỗi khối có vai trò rõ: khuyến mãi kéo chuyển đổi, cẩm nang cung cấp thông tin, còn hỗ trợ giảm ma sát trong quá trình đặt vé."
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
              title="Phần râu ria quan trọng được nâng thành khối chính"
              description="Giao diện nhìn chuyên nghiệp hơn khi trợ lý hỗ trợ, câu hỏi thường gặp, cẩm nang sân bay và nội dung điểm đến đều có đất diễn rõ."
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
            eyebrow="Điều hành nội bộ"
            title="Khu nội bộ được tổ chức như một phòng điều phối chuyến bay"
            description="Các khối tài chính, hỗ trợ, phân quyền và vận hành cùng xuất hiện rõ ràng để hệ thống thống nhất từ đầu đến cuối."
          />
          <div className="command-grid">
            <div className="command-metrics">
              {backofficeMetrics.map((metric) => (
                <article key={metric.label} className="glass-card metric-card-dark">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <p>{metric.trend}</p>
                </article>
              ))}
            </div>
            <div className="command-side">
              <article className="glass-card command-panel">
                <h3>Bản đồ vai trò</h3>
                <div className="role-chip-cloud">
                  {roleRules.slice(0, 6).map((rule) => (
                    <span key={rule.role} className="role-chip">
                      {ROLE_LABELS[rule.role]}
                    </span>
                  ))}
                </div>
                <p>
                  Quyền truy cập được chốt từ đầu nên UI không bị lẫn giữa khách
                  hàng, nhân viên bán vé, bộ phận chăm sóc khách hàng và quản trị viên hệ thống.
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

        .section-heading p {
          max-width: 68ch;
          color: rgba(16, 45, 78, 0.76);
          font-size: 1.01rem;
          line-height: 1.72;
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
          gap: 22px;
        }

        .home-destination-card {
          position: relative;
          isolation: isolate;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow:
            0 24px 48px rgba(18, 61, 105, 0.11),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
            rgba(7, 24, 41, 0.03) 14%,
            rgba(7, 24, 41, 0.18) 40%,
            rgba(7, 24, 41, 0.56) 72%,
            rgba(7, 24, 41, 0.82) 100%
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
            linear-gradient(180deg, rgba(8, 28, 48, 0) 18%, rgba(8, 28, 48, 0.2) 58%, rgba(8, 28, 48, 0.44) 100%);
        }

        .home-destination-top {
          gap: 18px;
        }

        .home-destination-top strong {
          display: block;
          margin-bottom: 6px;
          color: rgba(255, 252, 246, 0.98);
          font-size: clamp(1.34rem, 1.7vw, 1.62rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          text-shadow: 0 4px 18px rgba(7, 24, 41, 0.18);
        }

        .home-destination-top p {
          margin: 0;
          color: rgba(247, 243, 234, 0.9);
          line-height: 1.55;
          text-shadow: 0 3px 12px rgba(7, 24, 41, 0.14);
        }

        .home-destination-card .pill {
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: linear-gradient(
            135deg,
            rgba(11, 38, 66, 0.42),
            rgba(255, 255, 255, 0.12)
          );
          color: rgba(255, 251, 244, 0.96);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(8px);
        }

        .home-destination-bottom {
          display: grid;
          gap: 16px;
        }

        .home-destination-bottom h3 {
          margin-bottom: 0;
          color: #fff2cf;
          font-size: clamp(1.65rem, 2.8vw, 2.22rem);
          line-height: 1;
          letter-spacing: -0.04em;
          text-shadow: 0 6px 22px rgba(7, 24, 41, 0.24);
        }

        .home-destination-list {
          display: grid;
          gap: 10px;
          padding: 16px 18px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            180deg,
            rgba(9, 31, 52, 0.14),
            rgba(9, 31, 52, 0.36)
          );
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(8px);
        }

        .home-destination-list li {
          color: rgba(255, 248, 239, 0.94);
          text-shadow: 0 2px 10px rgba(7, 24, 41, 0.14);
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

          .home-destination-grid {
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
