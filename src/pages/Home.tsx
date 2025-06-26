import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import type { IArticle } from "../types/post";
import { supabase } from "../utils/supabaseClient";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import BenefitsBlock from "../components/BenefitsBlock";
import TipsBlock from "../components/TipsBlock";
import { CoconutUsesBlock } from "../components/CoconutUsesBlock";
import { MissionBlock } from "../components/MissionBlock";
import { slugify } from "../utils/slugify";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Home = () => {
  const [posts, setPosts] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("ashley_articles")
          .select("*")
          .order("published_date", { ascending: false })
          .limit(6);
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("hasSeenModal")) {
      setShowModal(true);
      localStorage.setItem("hasSeenModal", "true");
    }
  }, []);

  if (loading)
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div>
      <BenefitsBlock />
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Hot Posts</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={cardVariants}>
              <a href={`/post/${slugify(post.title)}`} className="block">
                <PostCard post={post} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
      <MissionBlock />

      <CoconutUsesBlock />
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Popular Posts</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.slice(0, 3).map((post) => (
            <motion.div key={post.id} variants={cardVariants}>
              <a href={`/post/${slugify(post.title)}`} className="block">
                <PostCard post={post} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <TipsBlock />
      <div id="main-content" />
    </div>
  );
};
export default Home;
