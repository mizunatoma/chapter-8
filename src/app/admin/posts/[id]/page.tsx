"use client";

export default function EditPostsPage() {

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">記事編集</h1>

      <form className="block space-y-4 mb-1 text-sm">
        <div>
          <label className="block">タイトル</label>
          <input 
            type="text"
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block">内容</label>
          <textarea
            rows={2}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block">サムネイルURL</label>
          <input 
            type="text"
            defaultValue="https;//placehold.jp/800x400.png"
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block">カテゴリー</label>
          <input 
            type="text"
            className="border rounded w-full p-2"
          />
        </div>     

        <div className="flex gap-4 mt-4">
          <button className="border rounded text-white bg-blue-600 px-4 py-2 hover:bg-blue-700">
            更新
          </button>
          <button className="border rounded text-white bg-red-600 px-4 py-2 hover:bg-red-700">
            削除
          </button>
        </div>
      </form>
    </div>
  )
}