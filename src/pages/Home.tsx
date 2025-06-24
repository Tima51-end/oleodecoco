import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import type { IArticle } from "../types/post";
import { supabase } from "../utils/supabaseClient";
import Modal from "../components/Modal";
import BenefitsBlock from "../components/BenefitsBlock";
import TipsBlock from "../components/TipsBlock";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <BenefitsBlock />
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <section className="mb-16">
        <div className="bg-gray-50 border border-gray-300 text-gray-700 text-center py-12 px-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
          <p className="text-2xl font-semibold italic leading-relaxed">
            True wellness begins with what you put on and into your body.
            <br />
            Nature offers everything we need — we just have to listen.
          </p>
        </div>
      </section>

      <TipsBlock />

      <section className="mb-16">
        <div className="bg-gray-50 border border-gray-300 text-gray-700 text-center py-12 px-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
          <p className="text-2xl font-semibold italic leading-relaxed">
            🧴 Oleo de Coco is more than just a product. It’s a choice.
            <br />
            A path to a cleaner, more honest way of living.
            <br />
            Stay with us — read, share, and feel free to reach out with your questions.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Hot Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
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

      <section>
        <h2 className="text-3xl font-bold mb-6">Popular Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="m-16">
        <div className="bg-gray-50 border border-gray-300 text-gray-700 text-center py-12 px-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
          <p className="text-2xl font-semibold italic leading-relaxed">
            🌿 We believe that self-care begins with simplicity — nature, daily rituals, and mindful breathing.
            <br />
            <br />
            Each article here is written with care, offering small steps toward a more balanced, natural lifestyle through gentle practices, inspiration, and holistic knowledge.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
