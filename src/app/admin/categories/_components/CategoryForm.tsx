"use client";
import React from 'react';

interface Props {
  mode: 'new' | 'edit'
  name: string
  setName: (title: string) => void
  onSubmit: (e: React.FormEvent) => void
  onDelete?: () => void
}

export const CategoryForm: React.FC<Props> = ({
  mode,
  name,
  setName,
  onSubmit,
  onDelete,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-xl font-bold mb-6">
        {mode === 'edit' ? 'カテゴリー編集' : 'カテゴリー作成'}
      </h1>
      
      <div>
        <label className="block">カテゴリー</label>
        <input
          type="text"
          className="border rounded w-full p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="border rounded text-white bg-blue-600 px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {mode === 'edit' ? '更新' : '作成'}
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
  );
};
