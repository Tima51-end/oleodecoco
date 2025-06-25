import { useEffect, useState, useRef } from "react";
import PostCard from "../components/PostCard";
import type { IArticle } from "../types/post";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Blog = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<IArticle[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postsRef = useRef(null);
  const isInView = useInView(postsRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("ashley_articles")
          .select("*")
          .order("published_date", { ascending: false });

        if (error) throw error;
        console.log("Fetched posts:", data); // Отладка
        setPosts(data || []);
        setFilteredPosts(data || []);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          (post.content &&
            post.content.toLowerCase().includes(search.toLowerCase()))
      )
    );
    console.log("Filtered posts:", filteredPosts); // Отладка
  }, [search, posts]);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Loading posts...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-600 text-lg">{error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 text-center tracking-tight bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">
        Our Blog
      </h1>

      {/* Новый баннер для вовлечения */}
      <section className="mb-12 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Discover Natural Living
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Dive into our collection of articles on natural wellness, coconut oil
          benefits, and sustainable living. Subscribe to our newsletter for
          exclusive tips and updates!
        </p>
        <Link
          to="/contact"
          className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Join Our Community
        </Link>
      </section>

      <div className="mb-10">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            max-w-[900px]
            block
            mx-auto
            p-4
            border
            border-gray-200
            rounded-lg
            shadow-lg
            bg-white/90
            placeholder-gray-400
            focus:outline-none
            focus:ring-4
            focus:ring-green-400
            focus:border-green-600
            transition
            text-lg
          "
        />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No posts found matching your search.
        </p>
      ) : (
        <motion.div
          ref={postsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "visible"} // Временный обход: всегда видимы
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              className="block rounded-xl transition-transform duration-300 hover:-translate-y-1"
              style={{ zIndex: 1 }}
            >
              <Link to={`/post/${post.id}`} className="block">
                <PostCard post={post} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Blog;