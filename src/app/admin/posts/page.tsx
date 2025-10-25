"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Posts } from "@/app/_types"
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSupabaseSession()

// ===============================
// GET
// ===============================
  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        const res = await fetch("/api/admin/posts", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token, // 👈 Header に token を付与 (=APIの利用制限)
          },
        })
        const data = await res.json()
        setPosts(data.posts)
      } catch (error) {
        console.error("データ取得エラー：", error);
      } finally {
        setLoading(false);
      }
    }
    fetcher()
  }, [token]);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      <div className="flex justify-between items-center"> 
        <h2 className="text-xl font-bold text-gray-800 mb-2">記事一覧</h2>
        <Link
          href="/admin/posts/new"  
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm"
        >
          新規作成
        </Link>
      </div>

      <div>
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/admin/posts/${post.id}`}
            className="border-b block pb-2 hover:bg-gray-200 "
          >
              <h2 className="text-base font-semibold text-gray-900 mb-1">{post.title}</h2>
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString("ja-JP")}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}