import Image from "next/image";
import Link from "next/link";

import { footerColumns } from "@/lib/mock-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-mark">
            <Image
              src="/logo-aurora.svg"
              alt="Logo Aurora Air"
              width={48}
              height={48}
            />
          </span>
          <div>
            <strong>Aurora Air</strong>
            <p>
              Hệ thống đặt vé máy bay nội địa với đầy đủ khối tìm vé, tự phục vụ,
              hỗ trợ khách hàng và điều hành nội bộ.
            </p>
          </div>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            <ul className="footer-links">
              {column.links.map((link) => (
                <li key={link}>
                  <Link href="/">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-legal">
        <span>© 2026 Aurora Air. Hỗ trợ thanh toán, đổi hoặc hoàn và nhật ký kiểm soát.</span>
        <span>Hệ thống phục vụ đặt vé, quản lý hành trình và vận hành hàng không nội địa.</span>
      </div>
    </footer>
  );
}
