"use client";

import Link from "next/link";

export default function AdminPostsPage() {
  const posts = [
    { id: 1, title: "aaa", createdAt: "2025/10/18" },
    { id: 2, title: "bbbb", createdAt: "2025/10/18" },
    { id: 3, title: "\\cc", createdAt: "2025/10/18" },
    { id: 4, title: "dddd", createdAt: "2025/10/18" },
  ]

  return (
    <div>
      <div className="flex justify-between items-center"> 
        <h2 className="font-bold">記事一覧</h2>
        <Link
          href="/admin/posts/new"  
          className="bg-blue-500 rounded text-white px-4 p-2 font-bold"
        >
          新規作成
        </Link>
      </div>

      <div>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className="border-b block pb-2 hover:bg-gray-200"
          >
            <p className="font-semibold">{post.title}</p>
            <p className="text-gray-500 text-sm">{post.createdAt}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}
