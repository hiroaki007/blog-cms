"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const categories = ["すべて", "技術", "ライフスタイル", "レビュー", "プログラミング"];


export default function PostList() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", selectedCategory], // 記事一覧のキャッシュキー
    queryFn: async () => {
      const categoryQuery = selectedCategory === "すべて" ? "" : `?category=${selectedCategory}`;
      const res = await axios.get(`/api/posts${categoryQuery}`);
      return res.data;
    },
  });

  // 記事を削除するミューテーション
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await axios.delete("/api/posts/delete", { data: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }), // キャッシュ更新
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div>
      <h2 className="text-xl font-bold my-4">記事一覧</h2>

      <select className="mb-4 p-2 border" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}

      </select>


      {data?.map((post: any) => (
        <div key={post._id} className="border p-4 my-2 shadow">
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="text-sm text-gray-500">by {post.author}</p>
          <Link href={`/dashboard/edit?id=${post._id}`} className="text-blue-500 hover:underline">
            編集する
          </Link>
          <button
            onClick={() => deleteMutation.mutate(post._id)}
            className="bg-red-500 text-white p-2 ml-2"
          >
            削除する
          </button>
        </div>
      ))}
    </div>
  );
}
