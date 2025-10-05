"use client";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ 
  children,
 }: { 
  children: React.ReactNode;
 }) {
  return (
    <html lang="ja">
      <body className="bg-gary-50  text-gray-800">
        <header className="p-4 border-b border-gray-700 bg-black text-white">
          <nav className="flex items-center justify-between max-w-5xl mx-auto">
            <Link href="/" className="font-bold text-lg text-white-800 hover:opacity-80">Blog</Link>
            <Link href="/contact" className="text-white-800 hover:underline">お問い合わせ</Link>
          </nav>
        </header>

        <main className="max-w-3xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}



