import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  await connectDB();
  const posts = await Post.find();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const { title, content, author } = await req.json();
    const newPost = await Post.create({ title, content, author });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
