"use client";
import { useState } from "react";
import InputField from "@/app/_components/InputField";
import { useFormErrors } from "@/app/_hooks/useFormErrors";

// Contactページ

export default function ContactForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { errors } = useFormErrors({ name, email, message });

    const reset = () => {
      setName("");
      setEmail("");
      setMessage("");
    };

    // 送信処理
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();  // 送信時のページリロード防止

      if (Object.keys(errors).length > 0) return;
        setLoading(true);

      try {
        const res = await fetch(
          "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
          }
        );

        if(res.ok) {
          alert("送信しました");
          reset();
        } else {
          alert("送信に失敗しました");
        }  
      } catch(err) {
        console.error(err);
        alert("エラーが発生しました");
      } finally {
        setLoading(false);
      }   
    };

    return (
        <form onSubmit={handleSubmit} 
        className="max-w-lg mx-auto space-y-6 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2x1 font-bold text-center mb-4">お問い合わせフォーム</h2>

          <InputField
            label="お名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            disabled={loading}
          />
              
          <InputField
            label="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={loading}
          />

          <div>
              <label className="block font-medium text-gray-700">本文</label>
              <textarea
                value={message}
                disabled={loading}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                rows={5}
              />
              {errors.message && (<p className="text-red-500 text-sm mt-1">{errors.message}</p>)}
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 disabled:bg-gray-400">
                {loading ? "送信中..." : "送信"}
            </button>

              <button
                type='button'
                onClick={reset}
                disabled={loading}
                className="bg-gray-300 text-black px-6 py-2 rounded-md shadow hover:bg-gray-400 disabled:bg-gray-200"
              >
                クリア
              </button>
          </div>
        </form>
    );
}
