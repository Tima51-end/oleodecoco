import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import type { IArticle } from "../types/post";
import { supabase } from "../utils/supabaseClient";
import { FiFacebook, FiLinkedin, FiTwitter, FiBookmark } from "react-icons/fi";

// Вариант анимации для контейнера карточек
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Вариант анимации для каждой карточки
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IArticle | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [visiblePartsLength, setVisiblePartsLength] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from("ashley_articles")
          .select("*")
          .eq("id", Number(id))
          .single();

        if (postError) throw postError;
        if (!postData) throw new Error("Post not found");

        setPost(postData);

        const { data: relatedData, error: relatedError } = await supabase
          .from("ashley_articles")
          .select("*")
          .eq("type", postData.type)
          .neq("id", postData.id)
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedPosts(relatedData || []);
      } catch (err) {
        setError("Failed to fetch post");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "Check out this post!";
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const splitContent = (content: string) => {
    if (!content) return [content];

    const CHUNK_SIZE = 1000;
    const parts = [];
    let currentIndex = 0;

    while (currentIndex < content.length) {
      let endIndex = Math.min(currentIndex + CHUNK_SIZE, content.length);

      if (endIndex < content.length) {
        while (endIndex < content.length && content[endIndex] !== ">") {
          endIndex++;
        }
        if (endIndex < content.length) endIndex++;
      }

      parts.push(content.slice(currentIndex, endIndex));
      currentIndex = endIndex;
    }

    return parts;
  };

  if (loading)
    return (
      <div className="text-center py-12 text-gray-500 text-lg animate-pulse">
        Loading...
      </div>
    );
  if (error || !post)
    return (
      <div className="text-center py-12 text-red-600 text-lg">
        Post not found
      </div>
    );

  const contentParts = splitContent(post.content);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="lg:w-3/4 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <header className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              {post.title}
            </motion.h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
              <span>{post.published_date}</span>
              <span className="mx-2">•</span>
              <span>{post.reading_time}</span>
              <span className="mx-2">•</span>
              <span>by {post.author}</span>
              <span className="ml-4 inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                {post.type || "General"}
              </span>
            </div>
          </header>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-80 md:h-96 object-cover rounded-xl border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-full h-80 md:h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border border-dashed border-gray-300 text-gray-400 text-lg italic">
                No image available
              </div>
            )}
          </motion.div>

          <div className="prose max-w-none prose-lg text-gray-800 leading-relaxed space-y-6">
            {contentParts.slice(0, visiblePartsLength).map((part, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                dangerouslySetInnerHTML={{ __html: part }}
              />
            ))}

            {visiblePartsLength < contentParts.length && (
              <motion.button
                onClick={() => setVisiblePartsLength((prev) => prev + 1)}
                className="mx-auto block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Show More
              </motion.button>
            )}

            {visiblePartsLength >= contentParts.length && (
              <>
                <hr className="my-8 border-gray-200" />
                <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-700 text-lg">
                  "Embrace nature’s simplicity with every read — discover the timeless wisdom of natural living."
                </blockquote>
              </>
            )}
          </div>

          <footer className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <motion.div
                className="flex space-x-4 mb-4 sm:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => sharePost("twitter")}
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition transform hover:scale-110"
                  aria-label="Share on Twitter"
                >
                  <FiTwitter size={20} />
                </button>
                <button
                  onClick={() => sharePost("facebook")}
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition transform hover:scale-110"
                  aria-label="Share on Facebook"
                >
                  <FiFacebook size={20} />
                </button>
                <button
                  onClick={() => sharePost("linkedin")}
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition transform hover:scale-110"
                  aria-label="Share on LinkedIn"
                >
                  <FiLinkedin size={20} />
                </button>
                <button
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full transition transform hover:scale-110 ${
                    isBookmarked
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  aria-label="Bookmark post"
                >
                  <FiBookmark size={20} />
                </button>
              </motion.div>
              <div className="flex space-x-4 text-sm text-green-600">
                <Link
                  to={`/post/${Number(post.id) - 1}`}
                  className="hover:underline font-medium transition hover:text-green-700"
                >
                  ← Previous Post
                </Link>
                <Link
                  to={`/post/${Number(post.id) + 1}`}
                  className="hover:underline font-medium transition hover:text-green-700"
                >
                  Next Post →
                </Link>
              </div>
            </div>
          </footer>
        </article>

        <aside className="lg:w-1/4 sticky top-20 h-fit bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              About the Author
            </h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                {post.author[0]}
              </div>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">{post.author}</p>
                <p className="text-gray-600 text-sm">Wellness Enthusiast</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {post.author} is passionate about natural living and shares
              insights on holistic wellness and sustainable practices.
            </p>
            <hr className="my-4 border-gray-200" />
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Share This Post
            </h3>
            <div className="flex space-x-3">
              <button
                onClick={() => sharePost("twitter")}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                aria-label="Share on Twitter"
              >
                <FiTwitter size={18} />
              </button>
              <button
                onClick={() => sharePost("facebook")}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                aria-label="Share on Facebook"
              >
                <FiFacebook size={18} />
              </button>
              <button
                onClick={() => sharePost("linkedin")}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                aria-label="Share on LinkedIn"
              >
                <FiLinkedin size={18} />
              </button>
            </div>
            <hr className="my-4 border-gray-200" />
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Stay Connected
            </h3>
            <Link
              to="/contact"
              className="block text-center bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition"
            >
              Join Our Newsletter
            </Link>
          </motion.div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Related Posts</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {relatedPosts.map((relatedPost) => (
            <motion.div
              key={relatedPost.id}
              variants={cardVariants}
            >
              <Link
                to={`/post/${relatedPost.id}`}
                className="block"
              >
                <PostCard post={relatedPost} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default SinglePost;