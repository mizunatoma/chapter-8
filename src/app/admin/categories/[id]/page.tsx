"use client";

export default function EditCategoriessPage() {

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">カテゴリー名</h1>

      <form>
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