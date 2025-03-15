import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Post from "../../../../models/Post";

// 記事を取得するAPI（POSTリクエストでIDを受け取る）

export async function POST(req: Request) {
    await connectDB();
    try {
        const { id } = await req.json();

        if(!id) {
            return NextResponse.json({ error: "Missing post ID"}, { status: 400 });
        }

        const post = await Post.findById(id);

        if(!post) {
            return NextResponse.json({ error: "Post not found"}, {status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}