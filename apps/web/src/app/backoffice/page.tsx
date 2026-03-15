import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import {
  auditEntries,
  backofficeMetrics,
  backofficeModules,
  roleRules
} from "@/lib/mock-data";
import { ROLE_LABELS } from "@/lib/access-control";

const deskHighlights = [
  "Theo dõi đặt chỗ, thanh toán và trạng thái chuyến bay từ cùng một nguồn dữ liệu.",
  "Tách rõ phạm vi thao tác cho bán vé, chăm sóc khách hàng, khai thác và tài chính.",
  "Ghi nhận thay đổi nhạy cảm để hỗ trợ đối soát, hoàn tiền và xử lý sự cố."
];

export default function BackofficePage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero-card page-hero-card-dark">
          <div>
            <span className="section-eyebrow">Điều hành nội bộ</span>
            <h1 className="page-title">Trung tâm điều phối dành cho bán vé, hỗ trợ hành khách và khai thác chuyến bay.</h1>
            <p className="page-hero-copy">
              Nhân sự vận hành có thể theo dõi chỉ số trong ngày, mở từng phân hệ
              theo nhiệm vụ và kiểm tra lại lịch sử thao tác ở cùng một nơi.
            </p>
          </div>
          <div className="page-hero-stat-grid">
            {deskHighlights.map((item) => (
              <article key={item} className="page-hero-stat dark-stat">
                <strong>•</strong>
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="section-gap" />
        <div className="metric-grid">
          {backofficeMetrics.map((metric) => (
            <article key={metric.label} className="metric-card metric-card-strong">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.trend}</p>
            </article>
          ))}
        </div>

        <div className="section-gap" />
        <SectionHeading
          eyebrow="Phân khu điều phối"
          title="Mỗi nhóm nghiệp vụ có một phân hệ làm việc riêng"
          description="Bán vé, chăm sóc khách hàng, khai thác, tài chính, nội dung và quản trị hệ thống được tách thành các khu vực rõ chức năng để xử lý nhanh hơn trong ca trực."
        />
        <div className="module-grid">
          {backofficeModules.map((module) => (
            <Link key={module.key} href={module.href} className="surface-card module-card">
              <div className="module-card-head">
                <span className="pill">Phân khu nội bộ</span>
                <strong>↗</strong>
              </div>
              <h3>{module.title}</h3>
              <p>{module.summary}</p>
              <ul className="list-clean">
                {module.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <small>
                Vai trò: {module.roles.map((role) => ROLE_LABELS[role]).join(", ")}
              </small>
            </Link>
          ))}
        </div>

        <div className="section-gap" />
        <div className="section-split">
          <div>
            <SectionHeading
              eyebrow="Quy tắc phân quyền"
              title="Mỗi vai trò chỉ truy cập đúng nghiệp vụ được giao"
              description="Bảng phân quyền giúp kiểm tra nhanh phạm vi thao tác của từng nhóm trước khi xử lý hoàn tiền, đổi lịch bay hoặc cấu hình hệ thống."
            />
            <div className="table-card">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Vai trò</th>
                      <th>Cho phép</th>
                      <th>Giới hạn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleRules.map((rule) => (
                      <tr key={rule.role}>
                        <td>{ROLE_LABELS[rule.role]}</td>
                        <td>{rule.canAccess.join(" • ")}</td>
                        <td>{rule.restrictedFrom.join(" • ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Nhật ký kiểm soát"
              title="Theo dõi những thay đổi nhạy cảm theo thời gian gần thực"
              description="Mọi cập nhật quan trọng như điều kiện hoàn vé, thay đổi trạng thái chuyến bay hay xác nhận hoàn tiền đều được lưu lại để kiểm tra nhanh."
            />
            <div className="stack-list">
              {auditEntries.map((entry) => (
                <article key={`${entry.actor}-${entry.time}`} className="surface-card audit-card">
                  <span className="pill">{entry.time}</span>
                  <h3>{entry.action}</h3>
                  <p>{entry.target}</p>
                  <small>{entry.actor}</small>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
