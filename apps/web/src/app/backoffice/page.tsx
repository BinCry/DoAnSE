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
  "Một nguồn dữ liệu chung cho đặt chỗ, thanh toán và tình trạng chuyến bay.",
  "Phân quyền bám theo nghiệp vụ thật thay vì gom tất cả vào quản trị viên hệ thống.",
  "Nhật ký kiểm soát hiện diện như lớp cốt lõi của hoàn tiền, chuyến bay chậm và cấu hình."
];

export default function BackofficePage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero-card page-hero-card-dark">
          <div>
            <span className="section-eyebrow">Điều hành nội bộ</span>
            <h1 className="page-title">Khu điều hành rõ vai trò, rõ luồng xử lý và bám sát nghiệp vụ hàng không.</h1>
            <p className="page-hero-copy">
              Màn hình nội bộ được trình bày như phòng điều phối thực sự với
              các khối cảnh báo, phân khu theo nghiệp vụ và nhật ký kiểm soát đi kèm.
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
          title="Mỗi nhóm nội bộ có một bề mặt làm việc riêng"
          description="Bố cục phân khu được làm rõ hơn để khi nhìn vào là phân biệt ngay bán vé, chăm sóc khách hàng, vận hành, tài chính, quản trị nội dung và quản trị hệ thống."
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
              title="Vai trò nào thấy việc nấy"
              description="Màn hình quản trị nhìn chặt hơn khi quyền được diễn giải trực tiếp ngay trong giao diện thay vì chỉ nằm ở tài liệu."
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
              title="Những thay đổi nhạy cảm được đặt ở tuyến nhìn thấy"
              description="Cách trình bày này giúp việc hoàn tiền, đổi lịch bay và phân quyền luôn có bối cảnh kiểm soát rõ ràng."
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
