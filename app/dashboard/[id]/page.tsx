import { notFound } from "next/navigation";
import axios from "axios";

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
}

async function getPost(id: string): Promise<Post | null> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export default async function PostDetail({ params } : {params: { id: string} }) {
    const post = await getPost(params.id);

    if(!post) {
        return notFound();
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-600 text-sm mt-2">by {post.author}</p>
            <div className="mt-4 border-t pt-4">{post.content}</div>
        </div>
    );


}



