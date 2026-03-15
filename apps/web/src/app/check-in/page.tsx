import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { flightStatusBoard } from "@/lib/mock-data";

const checkInSteps = [
  "Xác minh lượt đặt chỗ bằng mã đặt chỗ và họ hành khách.",
  "Chọn lại ghế còn trống trong khung giờ làm thủ tục.",
  "Xác nhận quy định hành lý xách tay và hàng cấm.",
  "Nhận thẻ lên máy bay điện tử và bản tải về."
];

export default function CheckInPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero-card">
          <div>
            <span className="section-eyebrow">Làm thủ tục trực tuyến</span>
            <h1 className="page-title">Làm thủ tục trực tuyến nhanh gọn trước giờ khởi hành.</h1>
            <p className="page-hero-copy">
              Làm thủ tục mở trước 24 giờ và đóng trước 60 phút. Hành khách có thể
              chọn lại ghế, kiểm tra cửa ra tàu và tải thẻ lên máy bay điện tử ngay trên web.
            </p>
          </div>
          <div className="boarding-preview-card">
            <Image
              src="/images/vietnam-airport.jpg"
              alt="Máy bay tại sân bay Việt Nam"
              fill
              sizes="(max-width: 1180px) 100vw, 360px"
            />
            <div className="boarding-preview-overlay">
              <span className="pill">Thẻ lên máy bay</span>
              <h3>AU215 · Ghế 12A</h3>
              <p>Thành phố Hồ Chí Minh - Hà Nội · Cửa ra tàu D5 · Bản điện tử sẵn sàng tải</p>
            </div>
          </div>
        </div>

        <div className="section-gap" />
        <div className="section-split">
          <div className="surface-card">
            <h3>4 bước làm thủ tục</h3>
            <ol className="ordered-list">
              {checkInSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="surface-card accent-card">
            <h3>Mốc thời gian quan trọng</h3>
            <p>Mở làm thủ tục: trước giờ bay 24 giờ</p>
            <p>Đóng làm thủ tục: trước giờ bay 60 phút</p>
            <strong>Luôn đồng bộ với tình trạng chuyến bay và ghế đã chọn</strong>
          </div>
        </div>

        <div className="section-gap" />
        <SectionHeading
          eyebrow="Bảng tình trạng chuyến bay"
          title="Theo dõi thay đổi chuyến bay ngay trong lúc làm thủ tục"
          description="Các cập nhật về giờ bay, cửa ra tàu và trạng thái lên máy bay được hiển thị rõ để hành khách chuẩn bị tốt hơn trước khi ra cửa khởi hành."
        />
        <div className="table-card">
          <div className="table-wrap">
            <table data-mobile-stack="true">
              <thead>
                <tr>
                  <th>Chuyến bay</th>
                  <th>Hành trình</th>
                  <th>Giờ</th>
                  <th>Cửa</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {flightStatusBoard.map((item) => (
                  <tr key={item.code}>
                    <td data-label="Chuyến bay">{item.code}</td>
                    <td data-label="Hành trình">{item.route}</td>
                    <td data-label="Giờ">{item.time}</td>
                    <td data-label="Cửa">{item.gate}</td>
                    <td data-label="Trạng thái">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
