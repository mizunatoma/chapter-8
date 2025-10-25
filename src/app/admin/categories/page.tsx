"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Category } from "@/app/_types";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSupabaseSession()

// ===============================
// GET
// ===============================
  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        const res = await fetch("/api/admin/categories", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token, // APIの利用制限
          },
        })
        const data = await res.json();
        setCategories(data.categories)
      } catch (error) {
        console.error("データ取得エラー：", error);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [token]);

  if (loading) return <p>読み込み中…</p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">カテゴリー一覧</h2>
        <Link
          href="/admin/categories/new"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm"
        >
          新規作成
        </Link>
      </div>

      <div>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/admin/categories/${category.id}`}
            className="border-b block pb-2 hover:bg-gray-200"
          >
            <p className="text-base font-semibold text-gray-900 mb-1">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}