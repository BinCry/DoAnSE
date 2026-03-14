import type { Metadata } from "next";

import { ChatbotWidget } from "@/components/chatbot-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

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
      <body>
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
