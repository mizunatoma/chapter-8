"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Posts } from "@/app/_types/";
import { Category } from '@/app/_types/Category'
import { PostForm } from '../_components/PostForm'

export default function EditPostsPage() {
  const { id } = useParams() as { id?: string };  // as { id?: string } は型推論の補助（id が一時的にundefinedの可能性もあるため）
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("https://placehold.jp/800x400.png");
  const [categories, setCategories] = useState<Partial<Category>[]>([])
  const [loading, setLoading] = useState(true);

// ===============================
// GET
// ===============================
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`)
        const { post }: { post: Posts } = await res.json()
        setTitle(post.title)
        setContent(post.content)
        setThumbnailUrl(post.thumbnailUrl)
        setCategories(post.postCategories.map((pc) => pc.category as Partial<Category>))
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
    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, thumbnailUrl, categories }),
      });
      alert("更新しました");
      router.push("/admin/posts");
    } catch (error) {
      console.error("データ取得エラー：", error);
    } 
  };

// ===============================
// DELETE
// ===============================
  const handleDelete = async () => {
    if (!confirm("記事を削除しますか？")) return;
    try {
      await fetch(`/api/admin/posts/${id}`, { 
        method: "DELETE" });
      alert("削除しました");
      router.push("/admin/posts");
    } catch (error) {
      console.error("データ取得エラー：", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>読み込み中…</p>;

  return (
    <div>
      <PostForm
        mode="edit"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}