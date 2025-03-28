import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

// データベース接続
export async function POST(req: Request) {
  await connectDB();
  try {
    const { title, content, author, category, imageUrl } = await req.json();

    

    if (!title || !content || !author || !category || !imageUrl ) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newPost = await Post.create({ title, content, author, category, imageUrl });


    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

// 記事一覧を取得するエンドポイント
export async function GET(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query = category ? { category } : {};
    const posts = await Post.find();
    console.log("📌 MongoDB Fetched Posts:", posts);

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
