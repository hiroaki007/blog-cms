"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function EditPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id"); // クエリパラメータから ID を取得
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  // 記事データを取得してフォームにセット
  useEffect(() => {
    if (!postId) return;

    async function fetchPost() {
      try {
        const res = await axios.post("/api/posts/get", { id: postId });
        setFormData(res.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    }

    fetchPost();
  }, [postId]);

  // フォーム入力の変更処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 記事を更新する処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("/api/posts/update", { id: postId, ...formData });
      router.push("/dashboard"); // 更新後にダッシュボードへリダイレクト
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">記事を編集</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-md">
        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-2 border mb-2" />
        <textarea name="content" value={formData.content} onChange={handleChange} required className="w-full p-2 border mb-2" />
        <input type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full p-2 border mb-2" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">更新する</button>
      </form>
    </div>
  );
}
