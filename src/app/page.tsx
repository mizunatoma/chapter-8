"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Posts } from "@/app/_types";

export default function PostList() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("/api/posts") // 認証もネット越えも不要なので、キーもヘッダーも不要
        const data = await res.json() // JSON形式に変換
        setPosts(data.posts) // APIでreturnしてるposts
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setLoading(false); // 読み込み完了
      }
    }
    fetcher()
  }, [])

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <div className="border p-4 m-2">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}