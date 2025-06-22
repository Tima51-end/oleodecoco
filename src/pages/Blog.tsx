import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import type { IArticle } from '../types/post';
import { supabase } from '../utils/supabaseClient';

const Blog = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<IArticle[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, posts]);

  if (loading) return <div className="text-center py-10 text-gray-600">Loading posts...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900">Blog</h1>

      <div className="mb-10">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            max-w-[900px]  /* примерно ширина 3 колонок с gap */
            block
            mx-auto
            p-4
            border
            border-gray-300
            rounded-lg
            shadow-lg
            bg-white/90
            placeholder-gray-400
            focus:outline-none
            focus:ring-4
            focus:ring-green-400
            focus:border-green-600
            transition
          "
        />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
