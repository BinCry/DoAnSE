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
            <span className="pill">Tiếng Việt</span>
            <span className="pill">
              Đặt vé nội địa, tự phục vụ và điều hành trên một hệ thống
            </span>
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
        <div className="nav-row-primary">
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
              <small>
                Hệ thống bán vé, tự phục vụ và điều hành hàng không nội địa
              </small>
            </span>
          </Link>
          <div className="nav-row-actions">
            <div className="nav-meta">
              <span>Trung tâm hỗ trợ</span>
              <strong>1900 6868</strong>
            </div>
            <Link
              href="/account"
              className="button button-secondary nav-action-button"
            >
              Tài khoản
            </Link>
            <Link
              href="/search"
              className="button button-primary nav-action-button"
            >
              Đặt vé
            </Link>
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setIsMobileOpen((value) => !value)}
              aria-expanded={isMobileOpen}
              aria-label="Mở menu điều hướng"
            >
              {isMobileOpen ? "Đóng" : "Menu"}
            </button>
          </div>
        </div>
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
          <div className="nav-actions-wrap">
            <nav className="mobile-utility-nav" aria-label="Tiện ích nhanh trên di động">
              {utilityLinks.map((link) => (
                <Link key={link.href} href={link.href} className="mobile-utility-link">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="nav-actions">
              <div className="nav-meta nav-meta-mobile">
                <span>Trung tâm hỗ trợ</span>
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
      </div>
    </header>
  );
}
