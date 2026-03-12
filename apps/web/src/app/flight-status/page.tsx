import { SectionHeading } from "@/components/section-heading";
import { flightStatusBoard } from "@/lib/mock-data";

export default function FlightStatusPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Tình trạng chuyến bay"
          title="Trang công khai cho khách và trang điều hành phải cùng nhìn một trạng thái"
          description="Nếu chuyến bay chậm hoặc đổi cửa, thay đổi đó cần được phản ánh đồng thời ở website, khu quản lý đặt chỗ, khu làm thủ tục và email."
        />
        <div className="table-card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Mã chuyến</th>
                  <th>Hành trình</th>
                  <th>Giờ bay</th>
                  <th>Cửa ra tàu</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {flightStatusBoard.map((item) => (
                  <tr key={item.code}>
                    <td>{item.code}</td>
                    <td>{item.route}</td>
                    <td>{item.time}</td>
                    <td>{item.gate}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="section-gap" />
        <div className="card-grid card-grid-3">
          <article className="surface-card">
            <h3>Chuyến bay chậm</h3>
            <p>
              Điều hành cập nhật một lần, hệ thống phát thông báo tới lượt đặt chỗ bị
              ảnh hưởng và bảng điều hành nội bộ.
            </p>
          </article>
          <article className="surface-card">
            <h3>Đổi cửa ra tàu</h3>
            <p>
              Cập nhật nhanh trên trang làm thủ tục, màn hình sân bay và lịch sử
              thông báo trong tài khoản khách hàng.
            </p>
          </article>
          <article className="surface-card">
            <h3>Hủy chuyến</h3>
            <p>
              Tự động mở lựa chọn đổi chuyến, hoàn vé hoặc tạo yêu cầu ưu tiên cho
              bộ phận chăm sóc khách hàng.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
