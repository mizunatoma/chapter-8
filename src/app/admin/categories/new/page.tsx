"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryForm } from '../_components/CategoryForm'

export default function NewCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");

// ===============================
// POST (create)
// ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const { id } = await res.json();
    router.push(`/admin/categories/${id}`);
    alert("カテゴリーを作成しました");
  };

  return (
    <div>
      <CategoryForm
        mode="new"
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
      />   
    </div>
  );
}