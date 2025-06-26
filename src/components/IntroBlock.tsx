import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const IntroBlock: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleScroll = () => {
    const el = document.getElementById("main-content");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[500px] mb-16 overflow-hidden">
      <div className="absolute inset-0 w-screen h-full -left-[calc((100vw-100%)/2)]">
        <img
          src="/homeCocos.jpg"
          alt="Coconut background"
          className="w-full h-full object-cover z-0"
        />
      </div>

      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" />

      <motion.div
        ref={ref}
        className="relative z-20 max-w-4xl mx-auto p-10 rounded-2xl bg-white/50 backdrop-blur-md shadow-md mt-12"
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{ scale: 1.05 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Oleodecoco
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed text-lg">
          Oleodecoco is a space dedicated to natural care — where coconut oil
          stands as a symbol of purity, balance, and simplicity. We believe that
          true wellness begins with nature’s wisdom, passed down through
          generations.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed text-lg">
          Explore our insights, rituals, and tips on natural oils, skincare, and
          mindful living. From traditional remedies to modern self-care
          practices — our goal is to support your path to a healthier, more
          natural lifestyle.
        </p>
        <div className="mb-4">
          <a
            href="/about"
            className="text-green-600  font-semibold hover:text-green-700 transition-colors duration-300"
          >
            Learn more about us
          </a>
        </div>
        <p className="text-gray-600 text-sm italic">
          Inspired by nature. Rooted in simplicity. Guided by well-being.
        </p>
      </motion.div>

      <button
        onClick={handleScroll}
        className="fixed right-8 bottom-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition z-[12252555255]"
        aria-label="Scroll Down"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </section>
  );
};

export default IntroBlock;
