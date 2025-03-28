// app/posts/[id]/page.tsx

import axios from "axios";
import { notFound } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string; // オプション（画像がある場合）
}

// API経由で記事データを取得する関数
async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to fetch post:", error);
    return null;
  }
}

// ページコンポーネント（App Router形式）
export default async function PostDetail({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600 text-sm mt-2">by {post.author}</p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="my-4 w-full rounded-lg shadow" />
      )}
      <div className="mt-4 border-t pt-4 whitespace-pre-line">{post.content}</div>
    </div>
  );
}
