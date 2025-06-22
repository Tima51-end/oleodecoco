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
        const { data: postData, error: postError } = await supabase
          .from('ashley_articles')
          .select('*')
          .eq('id', Number(id))
          .single();

        if (postError) throw postError;
        if (!postData) throw new Error('Post not found');

        setPost(postData);

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

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;
  if (error || !post) return <div className="text-center py-12 text-red-600">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
        <div className="text-gray-500 text-sm mb-8">
          <span>{post.published_date}</span> &middot; <span>{post.reading_time}</span> &middot; <span>by {post.author}</span>
        </div>

        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl mb-8 border border-gray-200"
          />
        ) : (
          <div className="w-full h-60 bg-gray-100 rounded-xl mb-8 flex items-center justify-center border border-dashed border-gray-300 text-gray-400 text-lg italic">
            No image available
          </div>
        )}

        <div className="prose max-w-none prose-lg text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="mt-10 flex justify-between text-sm text-green-600">
          <Link to={`/post/${Number(post.id) - 1}`} className="hover:underline">← Previous Post</Link>
          <Link to={`/post/${Number(post.id) + 1}`} className="hover:underline">Next Post →</Link>
        </div>
      </article>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Related Posts</h2>
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
