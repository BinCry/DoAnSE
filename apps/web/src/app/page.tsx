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
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy hero-copy-rich">
            <span className="section-eyebrow">Aurora Air</span>
            <h1>Website bán vé máy bay nội địa với đầy đủ mua vé, tự phục vụ và điều hành.</h1>
            <p>
              Giao diện tập trung hoàn toàn vào đề tài bán vé máy bay: tìm chuyến
              bay, giá vé, dịch vụ bổ trợ, làm thủ tục trực tuyến, quản lý đặt chỗ, hỗ trợ khách
              hàng và khu vận hành nội bộ.
            </p>
            <div className="hero-actions">
              <Link href="/search" className="button button-primary">
                Đặt vé ngay
              </Link>
              <Link href="/backoffice" className="button button-secondary">
                Mở điều hành
              </Link>
            </div>
            <div className="hero-stat-grid">
              {heroStats.map((item) => (
                <article key={item.label} className="hero-stat-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <div className="hero-photo-ribbon">
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
          <div className="hero-panel-stack">
            <FlightSearchPanel />
            <div className="hero-glass-board">
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

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Điểm đến & chiến dịch"
            title="Trang chủ giờ có cảm giác biên tập như website hãng bay thật"
            description="Dải nội dung này kết hợp điểm đến, ưu đãi và mức giá khởi điểm để tạo cảm giác vừa truyền cảm hứng vừa sẵn sàng chuyển đổi."
          />
          <div className="destination-editorial-grid">
            {destinations.map((destination, index) => (
              <article
                key={destination.code}
                className={`destination-card destination-card-rich destination-card-${index + 1}`}
              >
                <div className="destination-overlay">
                  <div className="destination-top">
                    <div>
                      <strong>{destination.city}</strong>
                      <p>{destination.airport}</p>
                    </div>
                    <span className="pill">Điểm đến nổi bật</span>
                  </div>
                  <div className="destination-bottom">
                    <h3>{formatCurrency(destination.priceFrom)}</h3>
                    <ul className="list-clean">
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
    </>
  );
}
