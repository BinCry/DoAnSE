"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthShell } from "@/components/auth-shell";
import { PasswordChecklist } from "@/components/password-checklist";
import { StatusChip } from "@/components/status-chip";
import { isPasswordPolicySatisfied } from "@/lib/password-policy";

const registerStats = [
  {
    label: "Hồ sơ hành khách",
    value: "Lưu sẵn",
    detail: "Giảm thao tác nhập lại giấy tờ và thông tin liên hệ ở lần đặt vé tiếp theo."
  },
  {
    label: "Thông báo chuyến bay",
    value: "Theo thời gian thực",
    detail: "Nhận nhắc làm thủ tục, thay đổi giờ bay và cập nhật cổng ra tàu."
  },
  {
    label: "Ưu đãi cá nhân",
    value: "Theo hành trình",
    detail: "Lưu voucher, khuyến mãi và quyền lợi phù hợp với nhu cầu của từng khách."
  }
];

const registerSupportItems = [
  {
    title: "Hỗ trợ tạo tài khoản",
    value: "1900 6868",
    note: "Giải đáp về email đăng ký, xác minh thông tin và quyền lợi hội viên."
  },
  {
    title: "Tra cứu hướng dẫn",
    value: "Trung tâm hỗ trợ trên web",
    note: "Xem trước các câu hỏi thường gặp về tài khoản, điểm thưởng và quên mật khẩu."
  }
];

const registerTrustPoints = [
  "Lưu người liên hệ và hành khách thường dùng cho các chặng nội địa tiếp theo.",
  "Theo dõi voucher, điểm thưởng và thông báo trong cùng một giao diện thân thiện với mobile.",
  "Chuẩn bị trước cho các bước xác minh email, quên mật khẩu và hỗ trợ sau bán."
];

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPrepared, setIsPrepared] = useState(false);

  const blockedFragments = [fullName, email, phone];
  const isPasswordValid = isPasswordPolicySatisfied(password, blockedFragments);
  const isFormValid =
    fullName.trim().length >= 2 &&
    email.trim().length > 0 &&
    phone.trim().length >= 10 &&
    isPasswordValid &&
    confirmPassword === password;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    setIsPrepared(true);
  }

  return (
    <AuthShell
      activeTab="register"
      eyebrow="Tạo tài khoản"
      title="Tạo tài khoản khách hàng để lưu hồ sơ, nhận ưu đãi và theo dõi hành trình thuận tiện hơn."
      description="Tài khoản Vietnam Airlines phù hợp với hành khách thường xuyên bay nội địa, cần lưu thông tin liên hệ, hồ sơ hành khách và các ưu đãi cá nhân. Bạn vẫn có thể xem website với vai trò khách nếu chưa muốn đăng ký ngay."
      badge="Đăng ký mới"
      stats={registerStats}
      sideTitle="Tạo nền tảng cho những lần đặt vé tiếp theo"
      sideDescription="Ngay từ bước đăng ký, hệ thống sẽ gợi ý mật khẩu an toàn, giúp chuẩn bị hồ sơ khách hàng gọn gàng và hạn chế rủi ro khi cần khôi phục tài khoản."
      trustPoints={registerTrustPoints}
      supportItems={registerSupportItems}
    >
      <div className="auth-form-head">
        <div>
          <span className="section-eyebrow">Đăng ký</span>
          <h2>Chuẩn bị tài khoản khách hàng mới</h2>
        </div>
        <StatusChip
          tone={isFormValid ? "success" : "warning"}
          label={isFormValid ? "Mật khẩu đạt chuẩn" : "Cần bổ sung thông tin"}
        />
      </div>

      {isPrepared ? (
        <article className="auth-success-card">
          <StatusChip tone="success" label="Hồ sơ đã sẵn sàng" />
          <h3>Tài khoản khách hàng đã được chuẩn bị</h3>
          <p>
            Hãy lưu lại email đăng ký để dùng cho bước xác minh, nhận thông báo hành
            trình và khôi phục mật khẩu khi cần. Bạn có thể quay lại màn hình đăng
            nhập để tiếp tục vào khu vực tài khoản.
          </p>
          <div className="auth-action-row">
            <Link href="/login" className="button button-primary">
              Chuyển sang đăng nhập
            </Link>
            <Link href="/support" className="button button-secondary">
              Xem hỗ trợ tài khoản
            </Link>
          </div>
        </article>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field-grid auth-field-grid-double">
            <label className="field auth-field">
              <span>Họ và tên</span>
              <input
                type="text"
                placeholder="Nguyễn Minh Anh"
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </label>

            <label className="field auth-field">
              <span>Email đăng ký</span>
              <input
                type="email"
                placeholder="khachhang@vietnam-airlines.vn"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="field auth-field">
              <span>Số điện thoại</span>
              <input
                type="tel"
                placeholder="0912345678"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </label>

            <label className="field auth-field">
              <span>Mật khẩu</span>
              <input
                type="password"
                placeholder="Tạo mật khẩu an toàn"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <label className="field auth-field">
              <span>Nhập lại mật khẩu</span>
              <input
                type="password"
                placeholder="Nhập lại để xác nhận"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>
          </div>

          <PasswordChecklist
            password={password}
            blockedFragments={blockedFragments}
            confirmPassword={confirmPassword}
          />

          <div className="auth-note-card">
            <div className="auth-note-head">
              <h3>Sau khi có tài khoản</h3>
              <span className="pill">Khách vẫn có thể duyệt web</span>
            </div>
            <p>
              Tài khoản giúp lưu hồ sơ hành khách, nhận nhắc việc trước giờ bay và
              theo dõi thông báo sau bán. Nếu chưa muốn đăng ký ngay, bạn vẫn có thể
              tiếp tục tìm vé hoặc tra cứu đặt chỗ với vai trò khách.
            </p>
          </div>

          <div className="auth-action-row">
            <button
              type="submit"
              className="button button-primary"
              disabled={!isFormValid}
            >
              Tạo tài khoản
            </button>
            <Link href="/login" className="button button-secondary">
              Tôi đã có tài khoản
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
