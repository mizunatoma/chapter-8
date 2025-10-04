import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// 全ページ共通レイアウト（Headerなど）

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
