import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
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
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero-card">
          <div>
            <span className="section-eyebrow">Tài khoản khách hàng</span>
            <h1 className="page-title">Không gian hội viên được nâng lên thành trung tâm sau bán thực thụ.</h1>
            <p className="page-hero-copy">
              Tại đây khách thấy điểm thưởng, hành khách thường dùng, chuyến sắp
              bay, voucher và thông báo vận hành thay vì chỉ một trang hồ sơ tĩnh.
            </p>
          </div>
          <div className="profile-media-card">
            <Image
              src="/images/airport-terminal.jpg"
              alt="Không gian sân bay dùng làm hình nền khu tài khoản"
              fill
              sizes="(max-width: 1180px) 100vw, 360px"
            />
            <div className="profile-media-overlay">
              <span className="pill">Hội viên Aurora</span>
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
              title="Danh sách hành khách thường dùng đã có cấu trúc rõ hơn"
              description="Mỗi hồ sơ có giấy tờ, sở thích ghế và ghi chú vận hành để rút ngắn bước điền khi đặt vé."
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
              title="Thông báo sản phẩm được gom thành một dòng thời gian"
              description="Khách tra lại được sự kiện thanh toán, mở làm thủ tục, chuyến bay chậm, hoàn tiền và yêu cầu hỗ trợ."
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
