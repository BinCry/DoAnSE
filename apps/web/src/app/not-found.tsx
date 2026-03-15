import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty-state">
        <span className="section-eyebrow">404</span>
        <h1>Không tìm thấy trang bạn đang truy cập.</h1>
        <p>
          Đường dẫn có thể đã thay đổi hoặc nội dung hiện không còn khả dụng. Bạn có thể
          quay lại trang chủ hoặc mở trung tâm hỗ trợ để tiếp tục tra cứu thông tin cần thiết.
        </p>
        <div className="hero-actions">
          <Link href="/" className="button button-primary">
            Về trang chủ
          </Link>
          <Link href="/support" className="button button-secondary">
            Mở trung tâm hỗ trợ
          </Link>
        </div>
      </div>
    </section>
  );
}
