import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { IArticle } from "../types/post";
import { supabase } from "../utils/supabaseClient";
import { slugify } from "../utils/slugify";
import { CommentsList } from "../components/CommentsList";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const SinglePost = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [post, setPost] = useState<IArticle | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IArticle[]>([]);
  const [prevPost, setPrevPost] = useState<IArticle | null>(null);
  const [nextPost, setNextPost] = useState<IArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleParts, setVisibleParts] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.from("ashley_articles").select("*");
        if (!data) throw new Error("No posts available");

        const found = data.find((p) => slugify(p.title) === slug);
        if (!found) throw new Error("Post not found");
        setPost(found);

        setRelatedPosts(
          data
            .filter((p) => p.type === found.type && p.id !== found.id)
            .slice(0, 3)
        );

        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.published_date).getTime() -
            new Date(a.published_date).getTime()
        );
        const idx = sorted.findIndex((p) => p.id === found.id);
        if (idx < sorted.length - 1) setPrevPost(sorted[idx + 1]);
        if (idx > 0) setNextPost(sorted[idx - 1]);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
    else {
      setError("Invalid post slug");
      setLoading(false);
    }
  }, [slug]);

  const splitContent = (content: string) => {
    if (!content) return [""];
    const CHUNK = 1000;
    const parts: string[] = [];
    let i = 0;
    while (i < content.length) {
      let end = Math.min(i + CHUNK, content.length);
      if (end < content.length) {
        while (end < content.length && content[end] !== ">") end++;
        end++;
      }
      parts.push(content.slice(i, end));
      i = end;
    }
    return parts;
  };

  if (loading)
    return (
      <div className="text-center py-12 text-gray-500 animate-pulse">
        Loading...
      </div>
    );
  if (error || !post)
    return (
      <div className="text-center py-12 text-red-600 text-lg">{error}</div>
    );

  const parts = splitContent(post.content);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="lg:w-3/4 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <header className="mb-8">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {post.title}
            </motion.h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 space-x-2">
              <span>{post.published_date}</span>
              <span>•</span>
              <span>{post.reading_time}</span>
              <span>•</span>
              <span>by {post.author}</span>
              <span className="ml-4 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                {post.type || "General"}
              </span>
            </div>
          </header>

          {post.image && (
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-80 md:h-96 object-cover rounded-xl border border-gray-200 shadow-sm mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          <div className="prose prose-lg text-gray-800 leading-[1.8] text-[20px] space-y-6 prose-a:underline prose-a:text-green-600 prose-a:hover:text-green-700">
            {parts.slice(0, visibleParts).map((html, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}

            {visibleParts < parts.length && (
              <button
                onClick={() => setVisibleParts((prev) => prev + 1)}
                className="mt-8 block mx-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Show More
              </button>
            )}

            {visibleParts >= parts.length && (
              <blockquote className="mt-12 border-l-4 border-green-600 pl-4 italic text-gray-700 text-lg">
                "Embrace nature’s simplicity with every read — discover the
                timeless wisdom of natural living."
              </blockquote>
            )}
          </div>

          <div className="mt-10 flex justify-between text-green-600">
            {prevPost ? (
              <Link
                to={`/post/${slugify(prevPost.title)}`}
                className="hover:underline font-medium"
              >
                ← Previous Post
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                to={`/post/${slugify(nextPost.title)}`}
                className="hover:underline font-medium"
              >
                Next Post →
              </Link>
            )}
          </div>
        </article>

        <aside className="lg:w-1/4 sticky top-20 h-fit bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              About the Author
            </h3>
            <div className="flex items-center mb-4 space-x-3">
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-600 font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-800">{post.author}</p>
                <p className="text-sm text-gray-600">Wellness Enthusiast</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {post.author} shares insights on holistic wellness and natural
              living.
            </p>
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {relatedPosts.map((rp) => (
                <motion.div key={rp.id} variants={cardVariants}>
                  <a
                    href={`/post/${slugify(rp.title)}`}
                    className="flex items-center space-x-3 hover:underline"
                  >
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="text-gray-900">{rp.title}</span>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </aside>
      </div>

      <section className="pt-16 border-t border-gray-200">
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>
        <CommentsList comments={post.comments || []} />
      </section>
    </div>
  );
};

export default SinglePost;
