"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthGooglePlaceholder } from "@/components/auth-google-placeholder";
import { AuthShell } from "@/components/auth-shell";
import { StatusChip } from "@/components/status-chip";

const loginStats = [
  {
    label: "Đặt chỗ sắp bay",
    value: "02 hành trình",
    detail: "Xem lại lịch bay, dịch vụ đã chọn và thời hạn làm thủ tục."
  },
  {
    label: "Ưu đãi hội viên",
    value: "03 mã",
    detail: "Lưu voucher và quyền lợi đang áp dụng theo hạng thành viên."
  },
  {
    label: "Thông báo cá nhân",
    value: "24/7",
    detail: "Nhận cảnh báo thay đổi giờ bay, cổng ra tàu và trạng thái thanh toán."
  }
];

const supportItems = [
  {
    title: "Tổng đài ưu tiên",
    value: "1900 6868",
    note: "Hỗ trợ đăng nhập, tra cứu đặt chỗ và xử lý yêu cầu gấp."
  },
  {
    title: "Email xác minh",
    value: "support@vietnam-airlines.vn",
    note: "Phù hợp khi cần đối chiếu email đăng ký hoặc thông tin tài khoản."
  }
];

const trustPoints = [
  "Lưu lịch sử đặt chỗ, hóa đơn và thông báo chuyến bay trong cùng một nơi.",
  "Đồng bộ hồ sơ hành khách thường dùng để đặt vé nhanh hơn trên cả điện thoại lẫn máy tính.",
  "Nhận ưu đãi hội viên, voucher cá nhân hóa và nhắc việc trước ngày khởi hành."
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRemember, setShouldRemember] = useState(true);
  const [isReadyToContinue, setIsReadyToContinue] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    setIsReadyToContinue(true);
  }

  return (
    <AuthShell
      activeTab="login"
      eyebrow="Tài khoản hành khách"
      title="Đăng nhập để theo dõi hành trình, điểm thưởng và các cập nhật dành riêng cho bạn."
      description="Khách hàng có tài khoản có thể xem lại đặt chỗ, lưu hồ sơ hành khách, nhận thông báo trước giờ bay và quản lý tiện ích sau khi mua vé. Nếu chưa có tài khoản, bạn vẫn có thể tiếp tục xem website và đặt vé với vai trò khách."
      stats={loginStats}
      sideTitle="Một tài khoản cho toàn bộ hành trình"
      sideDescription="Thông tin đặt chỗ, quyền lợi hội viên và thông báo thay đổi chuyến bay được gom về cùng một luồng theo dõi để hành khách thao tác nhanh hơn sau khi đăng nhập."
      trustPoints={trustPoints}
      supportItems={supportItems}
    >
      <div className="auth-form-head">
        <div>
          <span className="section-eyebrow">Đăng nhập</span>
          <h2>Tiếp tục vào khu vực tài khoản</h2>
        </div>
        <StatusChip
          tone={isReadyToContinue ? "success" : "neutral"}
          label={isReadyToContinue ? "Sẵn sàng tiếp tục" : "Chờ xác thực"}
        />
      </div>

      {isReadyToContinue ? (
        <article className="auth-success-card">
          <StatusChip tone="success" label="Đã kiểm tra đủ thông tin" />
          <h3>Phiên làm việc đã sẵn sàng để tiếp tục</h3>
          <p>
            Bạn có thể chuyển sang khu vực tài khoản để theo dõi hành trình, điểm
            thưởng và các cập nhật liên quan tới đặt chỗ của mình.
          </p>
          <div className="auth-action-row">
            <Link href="/account" className="button button-primary">
              Vào trang tài khoản
            </Link>
            <Link href="/manage-booking" className="button button-secondary">
              Quản lý đặt chỗ
            </Link>
          </div>
        </article>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <AuthGooglePlaceholder
            buttonLabel="Tiếp tục với Google"
            helperText="Lựa chọn đăng nhập bằng Google đang được chuẩn bị để nối vào luồng xác thực sau này. Hiện tại bạn vẫn có thể dùng email và mật khẩu như bên dưới."
          />

          <div className="auth-field-grid">
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
              <span>Mật khẩu</span>
              <input
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          </div>

          <div className="auth-helper-row">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={shouldRemember}
                onChange={(event) => setShouldRemember(event.target.checked)}
              />
              <span>Ghi nhớ tài khoản trên thiết bị cá nhân.</span>
            </label>

            <Link href="/forgot-password" className="auth-inline-link">
              Quên mật khẩu?
            </Link>
          </div>

          <div className="auth-note-card">
            <div className="auth-note-head">
              <h3>Dùng tài khoản để làm gì?</h3>
              <span className="pill">Khách vẫn xem web bình thường</span>
            </div>
            <p>
              Bạn vẫn có thể tìm chuyến bay, xem tình trạng chuyến bay, quản lý đặt
              chỗ và đọc cẩm nang hành trình mà không cần đăng nhập. Tài khoản giúp
              rút ngắn thao tác khi cần lưu hồ sơ, voucher và lịch sử giao dịch.
            </p>
          </div>

          <div className="auth-action-row">
            <button type="submit" className="button button-primary">
              Tiếp tục đăng nhập
            </button>
            <Link href="/register" className="button button-secondary">
              Tạo tài khoản mới
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
