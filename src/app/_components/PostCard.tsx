"use client";
import React from "react";
import { Post } from "@/app/_types";

type Props = {
    post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div className="border border-gray-300 m-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="flex gap-2">
          {post.categories.map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm border border-blue-500 text-blue-600 rounded"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <div
        className="mt-2 text-gray-700 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
