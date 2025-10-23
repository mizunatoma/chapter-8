"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Category } from "@/app/_types";
import { CategoryForm } from '../_components/CategoryForm'

export default function EditCategoriesPage() {
  const { id } = useParams() as { id?: string };
  const router = useRouter();

  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

// ===============================
// GET
// ===============================
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`);
        const { category }: { category: Category } = await res.json()
        setCategory(category);
        setName(category.name);
      } catch (error) {
        console.error("データ取得エラー：", error);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [id]);

// ===============================
// PUT (update)
// ===============================
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      alert("更新しました");
      router.push("/admin/categories")
    } catch (error) {
        console.error("データ更新エラー：", error);
    } finally {
      setIsSubmitting(false);
    }
  };

// ===============================
// DELETE
// ===============================
  const handleDelete = async () => {
    if (!confirm("カテゴリーを削除しますか？")) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      alert("削除しました");
      router.push("/admin/categories");
    } catch (error) {
        console.error("データ削除エラー：", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>読み込み中…</p>;
  if (!category) return <p className="text-red-600">カテゴリーが見つかりません</p>;

  return (
    <div>
      <CategoryForm
        mode="edit"
        name={name}
        setName={setName}
        onSubmit={handleUpdate}
        onDelete={handleDelete}
        isSubmitting={isSubmitting}
      />   
    </div>
  );
}