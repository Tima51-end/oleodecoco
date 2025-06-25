import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

export const CoconutUsesBlock = () => {
  const uses = [
    {
      title: "Skincare Rituals",
      description:
        "Use coconut oil as a natural moisturizer, makeup remover, or lip balm for soft, hydrated skin.",
    },
    {
      title: "Hair Care",
      description:
        "Apply as a deep conditioning mask to nourish dry ends and promote a healthy scalp.",
    },
    {
      title: "Cooking & Nutrition",
      description:
        "Incorporate coconut oil into your diet for a healthy fat source that supports energy and immunity.",
    },
    {
      title: "Home Remedies",
      description:
        "Leverage its antibacterial properties for minor cuts, burns, or as a soothing balm.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="my-16 px-4 max-w-7xl mx-auto" ref={ref}>
      <h2 className="text-3xl font-bold mb-10 text-center text-green-700">
        Explore Coconut Oil Uses
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {uses.map((use, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">{use.title}</h3>
            <p className="text-gray-700">{use.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};