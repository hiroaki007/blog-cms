"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const categories = ["技術", "ライフスタイル", "レビュー"]; // カテゴリー選択肢

export default function PostForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: categories[0],
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // ✅ 追加: 画像アップロード中の状態管理

  // 記事投稿のミューテーション
  const createPostMutation = useMutation({
    mutationFn: async (newPost: typeof formData) => {
      return await axios.post("/api/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setFormData({ title: "", content: "", author: "", category: categories[0], imageUrl: "" });
      setImageFile(null);
    },
  });

  // 画像を Cloudinary にアップロード
  const uploadImage = async () => {
    if (!imageFile) return;
    setIsUploading(true); // ✅ 画像アップロード開始

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ Content-Type を設定
      });

      console.log("✅ Uploaded Image URL:", res.data.secure_url);
      setFormData((prev) => ({ ...prev, imageUrl: res.data.secure_url }));
    } catch (error) {
      console.error("❌ Image upload failed:", error);
    } finally {
      setIsUploading(false); // ✅ アップロード完了
    }
  };

  // 入力フィールドの変更処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 画像ファイルの変更処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFile(e.target.files[0]);
  };

  // 投稿処理（画像アップロード後に記事を投稿）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFile) {
      await uploadImage(); // ✅ 画像をアップロード
    }

    createPostMutation.mutate(formData); // ✅ 記事を投稿
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">新しい記事を投稿</h2>
      <input type="text" name="title" placeholder="タイトル" value={formData.title} onChange={handleChange} required className="w-full p-2 border mb-2" />
      <textarea name="content" placeholder="本文" value={formData.content} onChange={handleChange} required className="w-full p-2 border mb-2" />
      <input type="text" name="author" placeholder="著者" value={formData.author} onChange={handleChange} required className="w-full p-2 border mb-2" />
      <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border mb-2">
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
      {isUploading && <p className="text-blue-500">画像をアップロード中...</p>}
      {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover mt-2" />}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isUploading}>
        {isUploading ? "投稿中..." : "投稿する"}
      </button>
    </form>
  );
}
