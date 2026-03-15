"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthShell } from "@/components/auth-shell";
import { PasswordChecklist } from "@/components/password-checklist";
import { StatusChip } from "@/components/status-chip";
import { isPasswordPolicySatisfied } from "@/lib/password-policy";

const forgotStats = [
  {
    label: "Xác minh OTP",
    value: "06 số",
    detail: "Mã xác thực được gửi về email đã đăng ký để bảo vệ tài khoản."
  },
  {
    label: "Thời gian hiệu lực",
    value: "10 phút",
    detail: "Khuyến nghị đổi mật khẩu ngay sau khi nhận được mã xác minh."
  },
  {
    label: "Kiểm tra an toàn",
    value: "Theo tiêu chí",
    detail: "Mật khẩu mới được đối chiếu với chuỗi phổ biến và thông tin cá nhân."
  }
];

const forgotSupportItems = [
  {
    title: "Tổng đài xác minh",
    value: "1900 6868",
    note: "Phù hợp khi bạn không còn truy cập được email hoặc cần đối chiếu thông tin gấp."
  },
  {
    title: "Email hỗ trợ",
    value: "support@vietnam-airlines.vn",
    note: "Gửi kèm mã đặt chỗ hoặc email đăng ký để được hướng dẫn nhanh hơn."
  }
];

const forgotTrustPoints = [
  "Luồng quên mật khẩu được chia thành từng bước rõ ràng để thao tác dễ hơn trên điện thoại.",
  "Mã OTP và mật khẩu mới đi theo cùng một màn hình, giảm nhầm lẫn khi khôi phục tài khoản.",
  "Tiêu chí mật khẩu được hiển thị trực tiếp để hạn chế việc đặt chuỗi quá yếu."
];

function maskEmail(email: string) {
  const [localPart, domain] = email.split("@");

  if (!localPart || !domain) {
    return email;
  }

  const head = localPart.slice(0, 2);
  const tail = localPart.slice(-1);

  return `${head}***${tail}@${domain}`;
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isOtpReady = /^\d{6}$/.test(otp);
  const isPasswordReady =
    isPasswordPolicySatisfied(password, [email]) &&
    confirmPassword.length > 0 &&
    confirmPassword === password;

  function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setStep(2);
  }

  function handleOtpSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isOtpReady) {
      return;
    }

    setStep(3);
  }

  function handleResetSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isPasswordReady) {
      return;
    }

    setStep(4);
  }

  return (
    <AuthShell
      activeTab="forgot-password"
      eyebrow="Khôi phục tài khoản"
      title="Lấy lại quyền truy cập bằng luồng OTP rõ ràng, dễ thao tác và kiểm tra an toàn ngay trên web."
      description="Khi quên mật khẩu, hành khách có thể xác minh email, nhập mã OTP và đặt lại mật khẩu mới ngay trên website. Website vẫn mở cho khách vãng lai, còn tài khoản chỉ được khôi phục sau khi qua bước xác minh phù hợp."
      badge="OTP qua email"
      stats={forgotStats}
      sideTitle="Khôi phục quyền truy cập theo từng bước"
      sideDescription="Mỗi bước được tách riêng để hành khách biết mình đang ở đâu trong quá trình khôi phục mật khẩu, đặc biệt hữu ích khi thao tác trên mobile hoặc khi cần nhận hỗ trợ từ tổng đài."
      trustPoints={forgotTrustPoints}
      supportItems={forgotSupportItems}
    >
      <div className="auth-form-head">
        <div>
          <span className="section-eyebrow">Quên mật khẩu</span>
          <h2>Khôi phục tài khoản qua mã OTP</h2>
        </div>
        <StatusChip
          tone={step === 4 ? "success" : "warning"}
          label={step === 4 ? "Hoàn tất" : `Bước ${step}/4`}
        />
      </div>

      <div className="auth-progress" aria-label="Tiến trình quên mật khẩu">
        {[
          "Nhập email",
          "Xác minh OTP",
          "Đặt mật khẩu mới",
          "Hoàn tất"
        ].map((label, index) => {
          const currentStep = index + 1;
          const state =
            currentStep < step
              ? "done"
              : currentStep === step
                ? "current"
                : "upcoming";

          return (
            <div
              key={label}
              className={`auth-progress-step auth-progress-step-${state}`}
            >
              <strong>{currentStep}</strong>
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      {step === 1 ? (
        <form className="auth-form" onSubmit={handleEmailSubmit}>
          <div className="auth-field-grid">
            <label className="field auth-field">
              <span>Email đã đăng ký</span>
              <input
                type="email"
                placeholder="khachhang@vietnam-airlines.vn"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <small>
                Mã OTP sẽ được gửi đến địa chỉ email dùng để tạo tài khoản.
              </small>
            </label>
          </div>

          <div className="auth-note-card">
            <div className="auth-note-head">
              <h3>Lưu ý trước khi tiếp tục</h3>
              <span className="pill">Bảo mật tài khoản</span>
            </div>
            <p>
              Hãy chắc chắn rằng bạn đang dùng đúng email đăng ký. Nếu không còn
              truy cập được email này, hãy liên hệ tổng đài để kiểm tra lại thông tin
              trước khi yêu cầu khôi phục mật khẩu.
            </p>
          </div>

          <div className="auth-action-row">
            <button type="submit" className="button button-primary">
              Gửi mã OTP
            </button>
            <Link href="/login" className="button button-secondary">
              Quay lại đăng nhập
            </Link>
          </div>
        </form>
      ) : null}

      {step === 2 ? (
        <form className="auth-form" onSubmit={handleOtpSubmit}>
          <div className="auth-note-card">
            <div className="auth-note-head">
              <h3>Mã OTP đã sẵn sàng để nhập</h3>
              <span className="pill">{maskEmail(email)}</span>
            </div>
            <p>
              Hãy kiểm tra hộp thư đến hoặc thư rác của bạn. Sau khi nhận được mã,
              nhập 6 chữ số để tiếp tục sang bước đặt lại mật khẩu mới.
            </p>
          </div>

          <div className="auth-field-grid">
            <label className="field auth-field">
              <span>Mã OTP gồm 6 chữ số</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="123456"
                maxLength={6}
                pattern="\d{6}"
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                required
              />
              <small>
                Mã xác minh chỉ nên dùng một mình bạn và không chia sẻ cho người khác.
              </small>
            </label>
          </div>

          <div className="auth-helper-row">
            <button
              type="button"
              className="text-button"
              onClick={() => setStep(1)}
            >
              Đổi lại email
            </button>
            <button type="button" className="text-button">
              Gửi lại mã
            </button>
          </div>

          <div className="auth-action-row">
            <button
              type="submit"
              className="button button-primary"
              disabled={!isOtpReady}
            >
              Xác minh OTP
            </button>
            <Link href="/support" className="button button-secondary">
              Cần hỗ trợ thêm
            </Link>
          </div>
        </form>
      ) : null}

      {step === 3 ? (
        <form className="auth-form" onSubmit={handleResetSubmit}>
          <div className="auth-field-grid auth-field-grid-double">
            <label className="field auth-field">
              <span>Mật khẩu mới</span>
              <input
                type="password"
                placeholder="Tạo mật khẩu mới"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <label className="field auth-field">
              <span>Nhập lại mật khẩu mới</span>
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
            blockedFragments={[email]}
            confirmPassword={confirmPassword}
          />

          <div className="auth-action-row">
            <button
              type="submit"
              className="button button-primary"
              disabled={!isPasswordReady}
            >
              Hoàn tất đặt lại mật khẩu
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setStep(2)}
            >
              Quay lại bước OTP
            </button>
          </div>
        </form>
      ) : null}

      {step === 4 ? (
        <article className="auth-success-card">
          <StatusChip tone="success" label="Khôi phục hoàn tất" />
          <h3>Mật khẩu mới đã sẵn sàng để sử dụng</h3>
          <p>
            Bạn có thể quay lại màn hình đăng nhập để tiếp tục vào khu vực tài khoản,
            xem hành trình sắp bay hoặc tra cứu các thông báo gần nhất dành cho mình.
          </p>
          <div className="auth-action-row">
            <Link href="/login" className="button button-primary">
              Quay lại đăng nhập
            </Link>
            <Link href="/manage-booking" className="button button-secondary">
              Quản lý đặt chỗ
            </Link>
          </div>
        </article>
      ) : null}
    </AuthShell>
  );
}
