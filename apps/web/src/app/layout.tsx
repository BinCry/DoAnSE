import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";

import { ChatbotWidget } from "@/components/chatbot-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const headingFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"]
});

const bodyFont = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Aurora Air",
  description:
    "Giao diện web bán vé máy bay nội địa với khu công khai, tự phục vụ và điều hành nội bộ."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <div className="site-shell">
          <SiteHeader />
          <main className="page-main">{children}</main>
          <SiteFooter />
          <ChatbotWidget />
        </div>
      </body>
    </html>
  );
}
