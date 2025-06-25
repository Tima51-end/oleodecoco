import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import type { IArticle } from "../types/post";
import { supabase } from "../utils/supabaseClient";
import Modal from "../components/Modal";
import BenefitsBlock from "../components/BenefitsBlock";
import TipsBlock from "../components/TipsBlock";
import { CoconutUsesBlock } from "../components/CoconutUsesBlock";
import { MissionBlock } from "../components/MissionBlock";

// Вариант анимации для контейнера карточек
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Задержка между карточками
    },
  },
};

// Вариант анимации для каждой карточки
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
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenModal");
    if (!hasSeenModal) {
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
      {showModal && <Modal onClose={() => setShowModal(false)} />}
      <MissionBlock />
      <section className="mb-16">
        <div className="bg-gray-50 border border-gray-300 text-gray-700 text-center py-12 px-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
          <p className="text-2xl font-semibold italic leading-relaxed">
            True wellness begins with what you put on and into your body.
            <br />
            Nature offers everything we need — we just have to listen.
          </p>
        </div>
      </section>
      <CoconutUsesBlock />
      <TipsBlock />
      <section className="mb-16">
        <div className="bg-gray-50 border border-gray-300 text-gray-700 text-center py-12 px-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
          <p className="text-2xl font-semibold italic leading-relaxed">
            🧴 Oleodecoco is more than just a platform. It’s a choice.
            <br />
            A path to a cleaner, more honest way of living.
            <br />
            Stay with us — read, share, and feel free to reach out with your
            questions.
          </p>
        </div>
      </section>
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
              <Link to={`/post/${post.id}`} className="block">
                <PostCard post={post} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className="mb-16">
        <div className="bg-gray-50 border border-gray-300 text-gray-700 text-center py-12 px-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
          <p className="text-2xl font-semibold italic leading-relaxed">
            Healthy skin is a reflection of a healthy lifestyle.
            <br />
            Coconut oil isn’t a trend — it’s a timeless tradition of care.
          </p>
        </div>
      </section>
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
              <Link to={`/post/${post.id}`} className="block">
                <PostCard post={post} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className="m-16">
        <div className="bg-gray-50 border border-gray-300 text-gray-700 text-center py-12 px-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
          <p className="text-2xl font-semibold italic leading-relaxed">
            🌿 We believe that self-care begins with simplicity — nature, daily
            rituals, and mindful breathing.
            <br />
            <br />
            Each article here is written with care, offering small steps toward
            a more balanced, natural lifestyle through gentle practices,
            inspiration, and holistic knowledge.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;