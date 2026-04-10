import Link from "next/link";

import { BackofficeAccessChip } from "@/components/backoffice-access-chip";
import { SectionHeading } from "@/components/section-heading";
import {
  auditEntries,
  backofficeMetrics,
  backofficeModules,
  roleRules
} from "@/lib/mock-data";
import { ROLE_LABELS, type BackofficeModuleKey } from "@/lib/access-control";

const deskHighlights = [
  "Giữ nguyên các phân hệ bán vé, hỗ trợ, tài chính, nội dung và kiểm soát nhưng chỉ còn 2 vai trò vận hành.",
  "Nhân viên chăm sóc khách hàng nhận nhóm việc bán vé hộ, hỗ trợ sau bán, hoàn tiền và nội dung hỗ trợ.",
  "Nhân viên vận hành phụ trách giá, lịch bay, tồn ghế, trạng thái chuyến bay và nhật ký kiểm soát."
];

export default function BackofficePage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero-card page-hero-card-dark">
          <div>
            <span className="section-eyebrow">Điều hành nội bộ</span>
            <h1 className="page-title">Trung tâm điều phối backoffice với 2 vai trò nội bộ đã gộp chức năng cần thiết.</h1>
            <p className="page-hero-copy">
              Backoffice vẫn giữ đủ các phân hệ nghiệp vụ cũ, nhưng toàn bộ quyền
              thao tác được gom lại cho 2 vai trò để giảm phân mảnh và dễ kiểm soát hơn.
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
          title="Hai vai trò nội bộ cùng làm việc trên các phân hệ chuyên môn"
          description="Các phân hệ bán vé, chăm sóc khách hàng, điều hành, tài chính, nội dung và kiểm soát hệ thống vẫn được giữ nguyên để không mất chức năng cần thiết."
        />
        <div className="module-grid">
          {backofficeModules.map((module) => (
            <Link key={module.key} href={module.href} className="surface-card module-card">
              <div className="module-card-head">
                <BackofficeAccessChip moduleKey={module.key as BackofficeModuleKey} />
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
              title="Hai vai trò nội bộ nhận lại quyền từ các vai trò đã giảm"
              description="Bảng phân quyền giúp kiểm tra nhanh nhóm việc đã được gộp cho chăm sóc khách hàng và vận hành trước khi xử lý đổi vé, hoàn tiền hay điều hành chuyến bay."
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
              description="Mọi cập nhật quan trọng sau khi gộp vai trò như điều kiện hoàn vé, thay đổi trạng thái chuyến bay hay xác nhận hoàn tiền đều được lưu lại để kiểm tra nhanh."
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
