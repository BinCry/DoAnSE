import Image from "next/image";
import Link from "next/link";

import { footerColumns } from "@/lib/mock-data";

const footerHighlights = [
  "Tổng đài hỗ trợ 1900 6868",
  "Tra cứu đặt chỗ và làm thủ tục mọi lúc",
  "Thông báo chuyến bay và hỗ trợ sau bán trên cùng hệ thống"
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-intro">
        <div className="footer-brand">
          <span className="brand-mark footer-brand-mark">
            <span className="footer-brand-mark-shell">
              <Image
                src="/logo-aurora.svg"
                alt="Logo Aurora Air"
                width={48}
                height={48}
              />
            </span>
          </span>
          <div>
            <strong>Aurora Air</strong>
            <p>
              Hệ thống bán vé máy bay nội địa với khu công khai, tự phục vụ,
              hỗ trợ khách hàng và điều hành nội bộ dùng chung một nền tảng.
            </p>
          </div>
        </div>
        <div className="footer-highlight-list">
          {footerHighlights.map((item) => (
            <span key={item} className="assurance-chip">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="container footer-grid">
        {footerColumns.map((column) => (
          <section key={column.title} className="footer-section">
            <h3>{column.title}</h3>
            <ul className="footer-links">
              {column.links.map((link) => (
                <li key={link}>
                  <Link href="/">{link}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="container footer-legal">
        <span>
          © 2026 Aurora Air. Hỗ trợ thanh toán, đổi hoặc hoàn và nhật ký kiểm
          soát trên cùng hệ thống.
        </span>
        <span>
          Nền tảng phục vụ đặt vé, quản lý hành trình và vận hành hàng không
          nội địa.
        </span>
      </div>
    </footer>
  );
}
