"use client";
import React from 'react';
import { Category } from "@/app/_types";
import { CategoriesSelect } from './CategoriesSelect'; 

interface Props {
  mode: 'new' | 'edit'
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
  thumbnailUrl: string
  setThumbnailUrl: (url: string) => void
  categories: Partial<Category>[]
  setCategories: (categories: Partial<Category>[]) => void
  onSubmit: (e: React.FormEvent) => void
  onDelete?: () => void
}

export const PostForm: React.FC<Props> = ({
  mode,
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  categories,
  setCategories,
  onSubmit,
  onDelete,
}) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-6">
        {mode === 'edit' ? '記事編集' : '記事作成'}
      </h1>

      <form className="block space-y-4 mb-1 text-sm" onSubmit={onSubmit}>
        <div>
          <label className="block">タイトル</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">内容</label>
          <textarea
            rows={6}
            className="border rounded w-full p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="block">サムネイルURL</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="thumbnailUrl"
            className="block text-sm font-medium text-gray-700"
          >
            カテゴリー
          </label>
          <CategoriesSelect
            selectedCategories={categories}
            setSelectedCategories={setCategories}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="border rounded text-white bg-blue-600 px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {mode === 'edit' ? '更新' : '投稿'}
          </button>

          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="border rounded text-white bg-red-600 px-4 py-2 hover:bg-red-700 disabled:opacity-50"
            >
              削除
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
