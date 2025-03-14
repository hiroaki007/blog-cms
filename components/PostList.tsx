"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";


export default function PostList() {
  
  const { data, error, isLoading } = useQuery({
    queryKey:["posts"], 
    queryFn: async () => {
    const res = await axios.get("/api/posts");
    return res.data;
    },
  });
  
  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>Error loading posts</p>;


  return (
  
    <div>
      <h2 className="text-xl font-bold my-4">記事一覧</h2>

      {data?.map((post: any) => (
        <div key={post._id} className="border-b p-4 my-2 shadow">

          <Link href={`/dashboard/${post._id}`} className="text-lg font-bold hover:underline">
            {post.title}
          </Link>

          <p className="text-sm text-gray-500">by {post.author}</p>
        </div>
      ))}
    </div>
    
  );
}