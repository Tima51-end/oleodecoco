import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import CategoryCard from '../components/CategoryCard';
import type { IArticle } from '../types/post';
import { supabase } from '../utils/supabaseClient';

const Blog = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<IArticle[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const categories = ['Health', 'Beauty', 'Recipes', 'Natural Therapy'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('ashley_articles')
          .select('*')
          .order('published_date', { ascending: false });
        
        if (error) throw error;
        setPosts(data || []);
        setFilteredPosts(data || []);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, posts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;