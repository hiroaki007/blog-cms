"use client";

import { useState } from "react";
import { Query, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function PostForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const mutation = useMutation({
    mutationFn: async (newPost: typeof formData) => {
      return await axios.post("/api/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // 記事一覧を更新
      setFormData({ title: "", content: "", author: "" }); // フォームをリセット
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">新しい記事を投稿</h2>
      <input
        type="text"
        name="title"
        placeholder="タイトル"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-2"
      />
      <textarea
        name="content"
        placeholder="本文"
        value={formData.content}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-2"
      />
      <input
        type="text"
        name="author"
        placeholder="著者"
        value={formData.author}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {mutation.isLoading ? "投稿中..." : "投稿する"}
      </button>
    </form>
  );
}
