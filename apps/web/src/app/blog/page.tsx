import { SectionHeading } from "@/components/section-heading";
import { featuredArticles, promotions } from "@/lib/mock-data";

const cmsRules = [
  "Banner, cẩm nang, câu hỏi thường gặp và trang pháp lý đều có trạng thái nháp, duyệt, đăng, lưu lịch sử phiên bản.",
  "Nội dung quản lý song ngữ Việt/Anh và có thể lên lịch theo chiến dịch.",
  "Trợ lý hỗ trợ chỉ đọc tri thức từ mục câu hỏi thường gặp đã phát hành."
];

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="blog-hero">
          <div className="blog-hero-copy">
            <span className="section-eyebrow">Cẩm nang, hướng dẫn, khuyến mãi</span>
            <h1 className="page-title">Cẩm nang hành trình, điểm đến và ưu đãi theo mùa cho hành khách nội địa.</h1>
            <p className="page-hero-copy">
              Từ gợi ý điểm đến, kinh nghiệm đi sân bay đến chương trình ưu đãi theo
              mùa, nội dung được tổ chức để hỗ trợ hành khách lên kế hoạch và quay lại
              bước đặt vé đúng lúc.
            </p>
          </div>
          <div className="blog-hero-panel">
            <span className="pill">Nội dung nổi bật</span>
            <h3>Nội dung hỗ trợ quyết định đặt vé</h3>
            <p>
              Các bài viết và chương trình ưu đãi được sắp cạnh nhau để hành khách
              vừa tham khảo thông tin, vừa nhanh chóng quay lại lựa chọn hành trình phù hợp.
            </p>
          </div>
        </div>

        <div className="section-gap" />
        <div className="blog-mosaic">
          {featuredArticles.map((article, index) => (
            <article
              key={article.slug}
              className={`surface-card blog-feature-card blog-feature-card-${index + 1}`}
            >
              <span className="pill">{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <small>{article.readTime}</small>
            </article>
          ))}
        </div>

        <div className="section-gap" />
        <SectionHeading
          eyebrow="Chiến dịch thương mại"
          title="Ưu đãi theo mùa và cẩm nang được đặt cạnh nhau để dễ theo dõi"
          description="Hành khách có thể xem nhanh chương trình đang áp dụng, đọc thêm thông tin liên quan và quay lại hành trình đặt vé mà không bị đứt mạch."
        />
        <div className="card-grid card-grid-3">
          {promotions.map((promotion) => (
            <article key={promotion.title} className="surface-card promo-card promo-card-soft">
              <span className="pill">{promotion.tag}</span>
              <h3>{promotion.title}</h3>
              <p>{promotion.summary}</p>
            </article>
          ))}
        </div>

        <div className="section-gap" />
        <div className="surface-card policy-card">
          <h3>Quy tắc quản trị nội dung bắt buộc</h3>
          <ul className="list-clean">
            {cmsRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
