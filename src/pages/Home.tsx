import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import CategoryCard from '../components/CategoryCard';
import type { IArticle } from '../types/post';
import { supabase } from '../utils/supabaseClient';

const Home = () => {
  const [posts, setPosts] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const categories = ['Health', 'Beauty', 'Recipes', 'Natural Therapy'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('ashley_articles')
          .select('*')
          .order('published_date', { ascending: false })
          .limit(6);
        
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Hot Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <CategoryCard key={category} category={category} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-6">Popular Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;