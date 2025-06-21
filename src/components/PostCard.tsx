import { Link } from 'react-router-dom';
import type { IArticle } from '../types/post';


interface PostCardProps {
  post: IArticle;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/post/${post.id}`} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition p-4">
      {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />}
      <div className="p-4">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p className="text-gray-600 mt-2">{post.summary}</p>
        <div className="mt-2 text-sm text-gray-500">
          <span>{post.published_date}</span> • <span>{post.reading_time}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;