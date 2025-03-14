import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const { title, content, author } = await req.json();
    const updatedPost = await Post.findByIdAndUpdate(params.id, { title, content, author }, { new: true });
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

export async function GET(req: Request, { params}: { params: { id: string}}) {
  await connectDB();
  try {
    const post = await Post.findById(params.id);
    if(!post) return NextResponse.json({error: "Post not found" }, {status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, {status: 500 });
  }
}