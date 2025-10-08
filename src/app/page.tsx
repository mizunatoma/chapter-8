"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PostCard from "@/app/_components/PostCard";
import { Post } from "@/app/_types";

// PostListページ
// → React Routerの代わりに、ファイル名でルーティングされる感覚を掴む

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch (
          "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
        );
        const data = await res.json();
        setPosts(data.posts); 
      } catch (error) {
        console.error("記事一覧の取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    }
    fetcher();
  }, []);

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