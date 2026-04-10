"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SectionHeading } from "@/components/section-heading";
import { loadActiveAuthSession, type AuthSession } from "@/lib/auth-session";
import { accountHighlights, notifications } from "@/lib/mock-data";

const travelers = [
  {
    name: "Nguyễn Minh Anh",
    meta: "Người lớn · Căn cước công dân đã xác minh",
    note: "Ưu tiên ghế gần cửa sổ"
  },
  {
    name: "Lê Khánh Linh",
    meta: "Trẻ em · Hộ chiếu lưu sẵn",
    note: "Tự động gợi ý điều kiện vé phù hợp"
  },
  {
    name: "Trần Quốc Huy",
    meta: "Người lớn · Doanh nhân thường bay",
    note: "Ưu tiên lối đi và lên máy bay sớm"
  }
];

export default function AccountPage() {
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [hasLoadedSession, setHasLoadedSession] = useState(false);

  useEffect(() => {
    setAuthSession(loadActiveAuthSession());
    setHasLoadedSession(true);
  }, []);

  const sessionUser = authSession?.user ?? null;
  const sessionRoleSummary = sessionUser?.roles.join(", ") ?? "khách";

  return (
    <section className="section">
      <div className="container">
        <div className="page-hero-card">
          <div>
            <span className="section-eyebrow">
              {sessionUser ? `Xin chào, ${sessionUser.displayName}` : "Tài khoản khách hàng"}
            </span>
            <h1 className="page-title">
              {sessionUser
                ? "Phiên của bạn đang được lưu cục bộ để tiếp tục theo dõi hành trình, hồ sơ và các thông báo quan trọng."
                : "Theo dõi điểm thưởng, hành trình sắp bay và thông báo quan trọng tại một nơi."}
            </h1>
            <p className="page-hero-copy">
              {sessionUser
                ? `Email đang dùng là ${sessionUser.email}. Vai trò hiện tại: ${sessionRoleSummary}. Bạn có thể tiếp tục quản lý hồ sơ thường dùng và các cập nhật mới nhất liên quan đến chuyến bay đã đặt.`
                : "Tài khoản giúp hành khách xem lại điểm hội viên, voucher khả dụng, hồ sơ thường dùng và những cập nhật mới nhất liên quan đến chuyến bay đã đặt."}
            </p>
            {sessionUser ? (
              <div className="auth-helper-row">
                <span className="pill">{sessionUser.email}</span>
                <span className="pill">
                  {sessionUser.emailVerified ? "Email đã xác minh" : "Email chưa xác minh"}
                </span>
                <span className="pill">Vai trò: {sessionRoleSummary}</span>
              </div>
            ) : null}
            {hasLoadedSession && !sessionUser ? (
              <div className="auth-note-card">
                <div className="auth-note-head">
                  <h3>Chưa có phiên đăng nhập cục bộ</h3>
                  <span className="pill">Có thể đăng nhập bất cứ lúc nào</span>
                </div>
                <p>
                  Bạn vẫn có thể xem nội dung tham khảo trên website, nhưng cần đăng nhập
                  để đồng bộ hồ sơ hành khách và lưu phiên làm việc trên trình duyệt này.
                </p>
                <div className="auth-action-row">
                  <Link href="/login" className="button button-primary">
                    Đăng nhập
                  </Link>
                  <Link href="/register" className="button button-secondary">
                    Tạo tài khoản
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <div className="profile-media-card">
            <Image
              src="/images/airport-terminal.jpg"
              alt="Không gian sân bay dùng làm hình nền khu tài khoản"
              fill
              sizes="(max-width: 1180px) 100vw, 360px"
            />
            <div className="profile-media-overlay">
              <span className="pill">Hội viên Vietnam Airlines</span>
              <h3>Hạng Vàng</h3>
              <p>Đồng bộ đặt chỗ, thông báo, điểm thưởng và quyền lợi theo tuyến.</p>
            </div>
          </div>
        </div>

        <div className="section-gap" />
        <div className="metric-grid">
          {accountHighlights.map((item) => (
            <article key={item.label} className="metric-card metric-card-strong">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>

        <div className="section-gap" />
        <div className="section-split">
          <div>
            <SectionHeading
              eyebrow="Hồ sơ & hành khách"
              title="Lưu sẵn hồ sơ hành khách để đặt vé nhanh hơn cho các chuyến tiếp theo"
              description="Thông tin giấy tờ, tùy chọn chỗ ngồi và ghi chú cần thiết được lưu gọn gàng để giảm thao tác nhập lại."
            />
            <div className="stack-list">
              {travelers.map((traveler) => (
                <article key={traveler.name} className="surface-card traveler-card">
                  <div>
                    <h3>{traveler.name}</h3>
                    <small>{traveler.meta}</small>
                  </div>
                  <p>{traveler.note}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Trung tâm thông báo"
              title="Mọi cập nhật quan trọng được gom về một dòng thời gian dễ theo dõi"
              description="Hành khách có thể xem lại trạng thái thanh toán, mở làm thủ tục, thay đổi chuyến bay và phản hồi từ bộ phận hỗ trợ."
            />
            <div className="stack-list">
              {notifications.map((item) => (
                <article key={item.title} className="surface-card notification-card">
                  <span className="pill">{item.time}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
