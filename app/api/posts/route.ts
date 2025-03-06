import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
    await connectDB();
    const posts = await Post.find();
    return NextResponse.json(posts);
}