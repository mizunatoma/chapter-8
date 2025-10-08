"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";

// PostDetailページ
// → 動的ルーティング（ReactのuseParams的な）を理解する

export default function PostDetail() {
  const { id } = useParams(); 
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const res = await fetch(
        `https://xtdq6xynpn.microcms.io/api/v1/posts/${id}`,　// microCMSのエンドポイント
        {
          headers: {
            'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string, // APIキーをセット
          },
        },
      )
      const data = await res.json()
      setPost(data) // dataをそのままセット
      setLoading(false)
    }

    fetcher()
  }, [id])

  if (loading) return <p>読み込み中...</p>
  if (!post) return <p className="text-red-600">記事が見つかりません</p>;
  

  return (
    <article className="max-w-3x1 mx-auto p-6">
      <Image
        src={post.thumbnail.url}
        alt={`${post.title}`}
        width={800}
        height={400}
        className="w-full rounded-lg mb-6"
      />

      <div className="flex justify-between items-center mb-6">    
        <p className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="flex gap-2">
          {post.categories.map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm border border-blue-500 text-blue-600 rounded"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      <h1 className="text-3x1 font-bold mb-4">{post.title}</h1>

      <div
        className="prose max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{__html: post.content}}
      />
    </article>
  );
}