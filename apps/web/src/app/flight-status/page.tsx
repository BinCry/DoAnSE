import { SectionHeading } from "@/components/section-heading";
import { flightStatusBoard } from "@/lib/mock-data";

export default function FlightStatusPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Tình trạng chuyến bay"
          title="Theo dõi giờ bay, cửa ra tàu và trạng thái mới nhất của chuyến bay"
          description="Hành khách có thể kiểm tra nhanh thời gian khởi hành, cửa ra tàu và các thay đổi quan trọng trước khi di chuyển ra sân bay."
        />
        <div className="table-card">
          <div className="table-wrap">
            <table data-mobile-stack="true">
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
                    <td data-label="Mã chuyến">{item.code}</td>
                    <td data-label="Hành trình">{item.route}</td>
                    <td data-label="Giờ bay">{item.time}</td>
                    <td data-label="Cửa ra tàu">{item.gate}</td>
                    <td data-label="Trạng thái">{item.status}</td>
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
              Hành khách nhận thông tin chậm chuyến kịp thời để chủ động sắp xếp
              lịch trình và theo dõi các hướng dẫn tiếp theo.
            </p>
          </article>
          <article className="surface-card">
            <h3>Đổi cửa ra tàu</h3>
            <p>
              Mọi thay đổi về cửa ra tàu được cập nhật nhanh để hành khách dễ theo
              dõi trong lúc làm thủ tục hoặc chờ lên máy bay.
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
