import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiHeart,
  FiZap,
  FiSun,
  FiCoffee,
  FiSmile,
  FiBookOpen,
} from "react-icons/fi";

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

const TipsBlock = () => {
  const tips = [
    {
      icon: <FiZap className="text-green-600 w-8 h-8" />,
      title: "Healthy Nutrition",
      description:
        "Incorporate nutrient-dense foods like fruits, vegetables, and healthy fats (like coconut oil) to fuel your body and boost energy levels.",
    },
    {
      icon: <FiSun className="text-green-600 w-8 h-8" />,
      title: "Active Lifestyle",
      description:
        "Engage in daily movement — whether it’s yoga, walking, or dancing — to enhance mood, improve circulation, and maintain vitality.",
    },
    {
      icon: <FiCoffee className="text-green-600 w-8 h-8" />,
      title: "Proper Daily Routine",
      description:
        "Establish a consistent sleep schedule and morning rituals to promote productivity, reduce stress, and foster inner calm.",
    },
    {
      icon: <FiSmile className="text-green-600 w-8 h-8" />,
      title: "Positive Mindset",
      description:
        "Practice gratitude and mindfulness daily to cultivate positivity, reduce anxiety, and improve overall mental well-being.",
    },
    {
      icon: <FiHeart className="text-green-600 w-8 h-8" />,
      title: "Self-Care Rituals",
      description:
        "Dedicate time to self-care with natural skincare routines or relaxing baths using coconut oil to nurture your body and soul.",
    },
    {
      icon: <FiBookOpen className="text-green-600 w-8 h-8" />,
      title: "Lifelong Learning",
      description:
        "Stay curious by exploring new topics, reading, or learning about natural wellness to keep your mind sharp and inspired.",
    },
    {
      icon: <FiZap className="text-green-600 w-8 h-8" />,
      title: "Hydration Habits",
      description:
        "Drink plenty of water and use coconut oil-based lip balms to keep your body and skin hydrated from the inside out.",
    },
    {
      icon: <FiSun className="text-green-600 w-8 h-8" />,
      title: "Connect with Nature",
      description:
        "Spend time outdoors to recharge, reduce stress, and deepen your connection to the natural world that inspires us.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="my-28 px-4 max-w-7xl mx-auto" ref={ref}>
      <h2 className="text-3xl font-bold mb-10 text-center text-green-700">
        Helpful Tips for Natural Living
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {tips.map(({ icon, title, description }, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TipsBlock;