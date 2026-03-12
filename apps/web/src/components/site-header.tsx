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
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-row">
          <div className="topbar-badges">
            <span className="pill">Tiếng Việt · Tiếng Anh</span>
            <span className="pill">Bay nội địa · Tự phục vụ · Điều hành</span>
          </div>
          <nav className="utility-nav" aria-label="Tiện ích nhanh">
            {utilityLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="container nav-row">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Image
              src="/logo-aurora.svg"
              alt="Logo Aurora Air"
              width={48}
              height={48}
            />
          </span>
          <span>
            <strong>Aurora Air</strong>
            <small>Hệ thống thương mại hàng không nội địa</small>
          </span>
        </Link>
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsMobileOpen((value) => !value)}
          aria-expanded={isMobileOpen}
          aria-label="Mở menu điều hướng"
        >
          {isMobileOpen ? "Đóng" : "Danh mục"}
        </button>
        <div className={isMobileOpen ? "nav-cluster mobile-open" : "nav-cluster"}>
          <nav className="main-nav" aria-label="Điều hướng chính">
            {mainNavigation.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? "nav-link active" : "nav-link"}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="nav-actions">
            <div className="nav-meta">
              <span>Trung tâm hội viên</span>
              <strong>1900 6868</strong>
            </div>
            <Link href="/account" className="button button-secondary">
              Tài khoản
            </Link>
            <Link href="/search" className="button button-primary">
              Đặt vé ngay
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
