import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import type { IArticle } from '../types/post';
import { supabase } from '../utils/supabaseClient';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IArticle | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndRelated = async () => {
      try {
        // Fetch single post
        const { data: postData, error: postError } = await supabase
          .from('ashley_articles')
          .select('*')
          .eq('id', Number(id))
          .single();

        if (postError) throw postError;
        if (!postData) throw new Error('Post not found');

        setPost(postData);

        // Fetch related posts
        const { data: relatedData, error: relatedError } = await supabase
          .from('ashley_articles')
          .select('*')
          .eq('type', postData.type)
          .neq('id', postData.id)
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedPosts(relatedData || []);
      } catch (err) {
        setError('Failed to fetch post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndRelated();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !post) return <div>Post not found</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-6">
        <span>{post.published_date}</span> • <span>{post.reading_time}</span> • <span>by {post.author}</span>
      </div>
      {post.image && <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-6" />}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-8">
        <Link to={`/post/${post.id - 1}`} className="text-green-600 hover:underline">Previous Post</Link>
        <Link to={`/post/${post.id + 1}`} className="text-green-600 hover:underline ml-4">Next Post</Link>
      </div>
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((relatedPost) => (
            <PostCard key={relatedPost.id} post={relatedPost} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SinglePost;