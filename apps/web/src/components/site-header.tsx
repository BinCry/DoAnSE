"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { mainNavigation, utilityLinks } from "@/lib/mock-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header className="site-header site-header-modern">
      <div className="topbar topbar-modern">
        <div className="container topbar-row topbar-row-modern">
          <div className="topbar-badges topbar-badges-modern">
            <span className="pill topbar-pill">Tiếng Việt · Tiếng Anh</span>
            <span className="pill topbar-pill">
              Bay nội địa · Tự phục vụ · Điều hành
            </span>
          </div>
          <nav className="utility-nav utility-nav-modern" aria-label="Tiện ích nhanh">
            {utilityLinks.map((link) => (
              <Link key={link.href} href={link.href} className="utility-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="container nav-row nav-row-modern">
        <Link href="/" className="brand brand-modern">
          <span className="brand-mark brand-mark-modern">
            <span className="brand-mark-shell">
              <Image
                src="/logo-aurora.svg"
                alt="Logo Aurora Air"
                width={48}
                height={48}
              />
            </span>
          </span>
          <span className="brand-copy">
            <strong>Aurora Air</strong>
            <small>Hệ thống thương mại hàng không nội địa</small>
          </span>
        </Link>
        <button
          type="button"
          className="mobile-menu-button mobile-menu-button-modern"
          onClick={() => setIsMobileOpen((value) => !value)}
          aria-expanded={isMobileOpen}
          aria-label="Mở menu điều hướng"
        >
          {isMobileOpen ? "Đóng" : "Danh mục"}
        </button>
        <div
          className={
            isMobileOpen
              ? "nav-cluster nav-cluster-modern mobile-open"
              : "nav-cluster nav-cluster-modern"
          }
        >
          <nav className="main-nav main-nav-modern" aria-label="Điều hướng chính">
            {mainNavigation.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive ? "nav-link nav-link-modern active" : "nav-link nav-link-modern"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="nav-actions nav-actions-modern">
            <div className="nav-meta nav-meta-modern">
              <span>Trung tâm hội viên</span>
              <strong>1900 6868</strong>
            </div>
            <Link href="/account" className="button button-secondary button-secondary-modern">
              Tài khoản
            </Link>
            <Link href="/search" className="button button-primary button-primary-modern">
              Đặt vé ngay
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .site-header-modern {
          position: sticky;
          box-shadow: 0 18px 36px rgba(9, 30, 66, 0.08);
          background:
            linear-gradient(180deg, rgba(246, 251, 255, 0.96), rgba(251, 250, 246, 0.9)),
            rgba(251, 250, 246, 0.84);
        }

        .site-header-modern::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(18, 61, 105, 0),
            rgba(18, 61, 105, 0.16),
            rgba(18, 61, 105, 0)
          );
        }

        .topbar-modern {
          background: linear-gradient(
            90deg,
            rgba(248, 252, 255, 0.9),
            rgba(229, 240, 252, 0.82)
          );
          border-bottom-color: rgba(18, 61, 105, 0.12);
        }

        .topbar-row-modern {
          min-height: 48px;
          gap: 16px;
        }

        .topbar-badges-modern {
          gap: 12px;
        }

        .topbar-pill {
          border: 1px solid rgba(18, 61, 105, 0.14);
          background: linear-gradient(
            135deg,
            rgba(247, 251, 255, 0.95),
            rgba(226, 238, 252, 0.88)
          );
          color: rgba(12, 42, 73, 0.96);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.82),
            0 8px 18px rgba(18, 61, 105, 0.06);
        }

        .utility-nav-modern {
          justify-content: flex-end;
          gap: 10px 16px;
        }

        .utility-link {
          display: inline-flex;
          align-items: center;
          min-height: 36px;
          padding: 0 16px;
          border-radius: 999px;
          color: rgba(13, 44, 76, 0.96);
          font-size: 0.82rem;
          font-weight: 700;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.96),
            rgba(232, 242, 254, 0.9)
          );
          border: 1px solid rgba(18, 61, 105, 0.12);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.84),
            0 10px 22px rgba(18, 61, 105, 0.07);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        .utility-link:hover {
          transform: translateY(-1px);
          color: var(--primary);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 1),
            rgba(238, 246, 255, 0.96)
          );
          border-color: rgba(18, 61, 105, 0.18);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 12px 24px rgba(18, 61, 105, 0.1);
        }

        .nav-row-modern {
          min-height: 96px;
          gap: 22px;
        }

        .brand-modern {
          flex-shrink: 0;
          gap: 16px;
          padding: 10px 18px 10px 10px;
          border-radius: 24px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9),
            rgba(238, 246, 255, 0.78)
          );
          border: 1px solid rgba(18, 61, 105, 0.08);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 16px 30px rgba(18, 61, 105, 0.08);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .brand-modern:hover {
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.86),
            0 20px 34px rgba(18, 61, 105, 0.12);
        }

        .brand-mark-modern {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 18px;
          background: linear-gradient(
            160deg,
            rgba(18, 61, 105, 0.18),
            rgba(68, 145, 223, 0.24)
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            0 16px 28px rgba(18, 61, 105, 0.18);
        }

        .brand-mark-shell {
          display: inline-grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.98),
            rgba(231, 243, 255, 0.92)
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 10px 18px rgba(18, 61, 105, 0.14);
          overflow: hidden;
        }

        .brand-copy {
          display: grid;
          gap: 4px;
        }

        .brand-copy strong {
          color: rgba(10, 34, 58, 0.96);
          font-size: 1.08rem;
          letter-spacing: -0.03em;
        }

        .brand-copy small {
          max-width: 30ch;
          color: rgba(16, 45, 78, 0.72);
          font-size: 0.78rem;
          font-weight: 600;
          line-height: 1.55;
        }

        .mobile-menu-button-modern {
          border: 1px solid rgba(18, 61, 105, 0.1);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.94),
            rgba(232, 242, 255, 0.86)
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.85),
            0 12px 24px rgba(18, 61, 105, 0.08);
        }

        .nav-cluster-modern {
          gap: 18px;
        }

        .main-nav-modern {
          gap: 8px;
          padding: 10px;
          border-color: rgba(18, 61, 105, 0.12);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.96),
            rgba(232, 242, 254, 0.9)
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.82),
            0 14px 30px rgba(18, 61, 105, 0.1);
        }

        .main-nav-modern .nav-link-modern {
          color: rgba(12, 42, 73, 0.94);
          padding: 11px 18px;
          font-size: 0.92rem;
          letter-spacing: -0.01em;
        }

        .main-nav-modern .nav-link-modern:hover,
        .main-nav-modern .nav-link-modern.active {
          color: rgba(12, 68, 120, 0.96);
          background: linear-gradient(
            135deg,
            rgba(192, 222, 255, 0.48),
            rgba(255, 255, 255, 0.98)
          );
          box-shadow:
            inset 0 0 0 1px rgba(29, 111, 184, 0.12),
            0 10px 20px rgba(18, 61, 105, 0.08);
        }

        .nav-actions-modern {
          position: relative;
          gap: 12px;
          padding-left: 18px;
        }

        .nav-actions-modern::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 1px;
          height: 44px;
          transform: translateY(-50%);
          background: linear-gradient(
            180deg,
            rgba(18, 61, 105, 0),
            rgba(18, 61, 105, 0.16),
            rgba(18, 61, 105, 0)
          );
        }

        .nav-meta-modern {
          min-height: 52px;
          padding: 10px 14px;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.96),
            rgba(233, 243, 254, 0.88)
          );
          border: 1px solid rgba(18, 61, 105, 0.12);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.88),
            0 12px 24px rgba(18, 61, 105, 0.08);
        }

        .nav-meta-modern span {
          color: rgba(16, 45, 78, 0.64);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
        }

        .nav-meta-modern strong {
          color: rgba(12, 68, 120, 0.96);
          font-size: 1rem;
        }

        .button-secondary-modern {
          min-height: 52px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.98),
            rgba(236, 245, 255, 0.92)
          );
          border: 1px solid rgba(18, 61, 105, 0.14);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 14px 28px rgba(18, 61, 105, 0.08);
        }

        .button-primary-modern {
          min-height: 54px;
          padding: 0 24px;
          background:
            radial-gradient(circle at 24% 20%, rgba(255, 255, 255, 0.34), transparent 34%),
            linear-gradient(135deg, #154f87 0%, #2471bd 52%, #4b9ee8 100%);
          color: #fdfefe;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow:
            0 18px 34px rgba(20, 78, 135, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.36);
        }

        .button-primary-modern:hover {
          box-shadow:
            0 22px 40px rgba(20, 78, 135, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .utility-link:focus-visible,
        .brand-modern:focus-visible,
        .mobile-menu-button-modern:focus-visible,
        .main-nav-modern .nav-link-modern:focus-visible,
        .button-secondary-modern:focus-visible,
        .button-primary-modern:focus-visible {
          outline: 2px solid rgba(34, 117, 191, 0.38);
          outline-offset: 3px;
        }

        @media (max-width: 1100px) {
          .nav-row-modern {
            gap: 16px;
          }

          .nav-actions-modern {
            padding-left: 0;
          }

          .nav-actions-modern::before {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .brand-modern {
            width: 100%;
          }

          .nav-cluster-modern {
            padding: 14px;
            border-radius: 24px;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.94),
              rgba(240, 247, 255, 0.88)
            );
            box-shadow: 0 18px 30px rgba(18, 61, 105, 0.08);
          }

          .nav-actions-modern {
            gap: 10px;
          }

          .nav-meta-modern {
            width: 100%;
          }
        }

        @media (max-width: 520px) {
          .brand-modern {
            padding: 12px;
            border-radius: 20px;
          }

          .brand-mark-modern {
            width: 52px;
            height: 52px;
          }

          .brand-mark-shell {
            width: 40px;
            height: 40px;
          }

          .brand-copy small {
            max-width: none;
          }

          .topbar-pill,
          .utility-link {
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
