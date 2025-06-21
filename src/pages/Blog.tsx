import { useState } from "react";
import PostCard from "../components/PostCard";
import CategoryCard from "../components/CategoryCard";
import postsData from "../data/posts.json";
import type { IArticle } from "../types/post";

const Blog = () => {
  const [search, setSearch] = useState("");
  const categories = ["Health", "Beauty", "Recipes", "Natural Therapy"];
  const posts: IArticle[] = postsData.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-6 flex flex-wrap gap-4">
        {categories.map((category) => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
