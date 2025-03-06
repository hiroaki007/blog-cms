"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";


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
      {data?.map((post: any) => (
        <div key={post._id} className="border-b p-4">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>by {post.author}</p>
        </div>
      ))}
    </div>
    
  );
}