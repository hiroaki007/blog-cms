import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default function Dashboard() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <PostForm />
      <PostList />
    </div>
  );
}
