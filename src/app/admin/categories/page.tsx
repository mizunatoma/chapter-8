"use client";

import Link from "next/link";

export default function AdminPostsPage() {
  const categories = [
    { id: 1, category: "React"},
    { id: 2, category: "TypeScript"},
    { id: 3, category: "JavaScript"},
  ]

  return (
    <div>
      <div className="flex justify-between items-center"> 
        <h2 className="font-bold">記事一覧</h2>
        <Link
          href="/admin/categories/new"  
          className="bg-blue-500 rounded text-white px-4 p-2 font-bold"
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
            <p className="font-semibold">{category.category}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}
