import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import postsData from '../data/posts.json';


const SinglePost = () => {
  const { id } = useParams();
  const post = postsData.find((p) => p.id === Number(id));
  const relatedPosts = postsData.filter((p) => p.type === post?.type && p.id !== post?.id).slice(0, 3);

  if (!post) {
    return <div>Post not found</div>;
  }

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