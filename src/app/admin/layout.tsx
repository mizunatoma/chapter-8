"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; //現在のURLパスを取得できるフック

export default function AdminLayout({ children }: { children: ReactNode }) {
  // 現在のパスを取得
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* サイドバー */}
        <aside className="w-60 bg-gray-100 border-r">
          <nav className="flex flex-col p-4 space-y-2">
            <Link 
              href="/admin/posts"
              className={`p-2 rounded ${
                pathname === "/admin/posts"
                ? "bg-blue-100 text-blue-600 font-bold"
                : "hover:bg-gray-200"
              }`}
            >
              記事一覧
            </Link>
            <Link
              href="/admin/categories"
              className={`p-2 rounded ${
                pathname === "/admin/categories"
                  ? "bg-blue-100 text-blue-600 font-bold"
                  : "hover:bg-gray-200"
              }`}
            >
              カテゴリー一覧
            </Link>
          </nav>
        </aside>

        {/* メイン */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

