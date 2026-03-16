import { getTravelArticles } from "@/lib/newsdata";
import { SectionHeading } from "@/components/section-heading";
import { promotions } from "@/lib/mock-data";

const cmsRules = [
  "Banner, cẩm nang, câu hỏi thường gặp và trang pháp lý đều có trạng thái nháp, duyệt, đăng, lưu lịch sử phiên bản.",
  "Nội dung quản lý song ngữ Việt/Anh và có thể lên lịch theo chiến dịch.",
  "Trợ lý hỗ trợ chỉ đọc tri thức từ mục câu hỏi thường gặp đã phát hành."
];

export const revalidate = 604800;

export default async function BlogPage() {
  const travelArticles = await getTravelArticles(9, true);

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
        <SectionHeading
          eyebrow="Tin du lịch mới"
          title="Danh sách bài báo du lịch đang được cập nhật từ nguồn tin tiếng Việt"
          description="Trang này gom nhiều bài báo du lịch để bạn theo dõi nhanh các điểm đến, trải nghiệm nghỉ dưỡng và xu hướng đi lại mới."
        />
        <div className="card-grid card-grid-3 travel-news-grid">
          {travelArticles.map((article) => (
            <a
              key={article.href}
              href={article.href}
              className="surface-card article-card travel-news-card"
              rel={article.external ? "noreferrer" : undefined}
              target={article.external ? "_blank" : undefined}
            >
              <div className="travel-news-card-media">
                <img src={article.image} alt={article.title} loading="lazy" />
              </div>
              <div className="travel-news-card-copy">
                <span className="pill">{article.source}</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <small>{article.readTime}</small>
              </div>
            </a>
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

        <style>{`
          .travel-news-grid {
            gap: 22px;
          }

          .travel-news-card {
            gap: 0;
            padding: 0;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
          }

          .travel-news-card-media {
            aspect-ratio: 1.56;
            overflow: hidden;
            background: linear-gradient(180deg, rgba(232, 240, 248, 0.9), rgba(246, 249, 252, 0.98));
          }

          .travel-news-card-media img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            transition: transform 220ms ease;
          }

          .travel-news-card:hover .travel-news-card-media img {
            transform: scale(1.03);
          }

          .travel-news-card-copy {
            display: grid;
            gap: 12px;
            padding: 20px 20px 22px;
          }

          .travel-news-card-copy h3 {
            margin: 0;
            line-height: 1.24;
          }

          .travel-news-card-copy p {
            margin: 0;
            color: rgba(14, 40, 69, 0.78);
            line-height: 1.68;
          }

          .travel-news-card-copy small {
            color: var(--muted);
          }
        `}</style>
      </div>
    </section>
  );
}
