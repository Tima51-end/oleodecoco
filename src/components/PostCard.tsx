import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { IArticle } from '../types/post';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PostCard = ({ post }: { post: IArticle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative border border-gray-200 rounded-xl shadow-sm bg-white"
      whileHover={{ scale: 1.05 }}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ zIndex: 1 }} // Предотвращаем наложение
    >
      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover rounded-t-xl border-b border-gray-200"
        />
      ) : (
        <div className="w-full h-56 bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center border-b border-gray-200 text-gray-400 text-lg italic">
          No image available
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 text-base line-clamp-3 mb-4">{post.summary}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{post.published_date}</span>
          <span>{post.reading_time}</span>
        </div>
        <div className="mt-4">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            {post.type || 'General'}
          </span>
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
        New
      </div>
    </motion.div>
  );
};

export default PostCard;