"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PostCard from "@/app/_components/PostCard";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";

export default function PostList() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("https://xtdq6xynpn.microcms.io/api/v1/posts", {　// 管理画面で取得したエンドポイント
          headers: {　// fetch関数の第二引数にheadersを設定でき、その中にAPIキーを設定します。
            'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string, // 管理画面で取得したAPIキー
          },
        })
        const { contents } = await res.json()
        setPosts(contents)
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    }

    fetcher()
  }, [])

  if (loading) return <p>読み込み中...</p>;

  return (
    <div>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
}