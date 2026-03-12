import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty-state">
        <span className="section-eyebrow">404</span>
        <h1>Trang bạn tìm chưa được dựng trong bản giao diện này.</h1>
        <p>
          Bạn có thể quay lại trang chủ hoặc mở khu điều hành nội bộ để xem các phân khu
          đã có sẵn trong bản triển khai đầu tiên.
        </p>
        <div className="hero-actions">
          <Link href="/" className="button button-primary">
            Về trang chủ
          </Link>
          <Link href="/backoffice" className="button button-secondary">
            Mở điều hành nội bộ
          </Link>
        </div>
      </div>
    </section>
  );
}
