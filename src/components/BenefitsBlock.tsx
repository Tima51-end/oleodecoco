import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MdEco,
  MdSpa,
  MdLocalHospital,
  MdStar,
  MdNaturePeople,
  MdFavorite,
} from "react-icons/md";

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

const BenefitsBlock = () => {
  const benefits = [
    {
      icon: <MdEco size={40} className="text-green-600" />,
      title: "Natural Ingredients",
      description:
        "Our products are crafted from 100% natural ingredients, free from harmful chemicals, ensuring safety and sustainability for you and the environment.",
    },
    {
      icon: <MdSpa size={40} className="text-green-600" />,
      title: "Skin Friendly",
      description:
        "Formulated to be gentle on all skin types, our coconut oil-based products hydrate, soothe, and promote radiant skin without irritation.",
    },
    {
      icon: <MdLocalHospital size={40} className="text-green-600" />,
      title: "Health Benefits",
      description:
        "Rich in antioxidants and healthy fats, coconut oil supports immunity, heart health, and overall wellness when used in skincare or nutrition.",
    },
    {
      icon: <MdStar size={40} className="text-green-600" />,
      title: "High Quality",
      description:
        "Every product undergoes rigorous quality checks to ensure purity, potency, and consistency, delivering unparalleled results.",
    },
    {
      icon: <MdNaturePeople size={40} className="text-green-600" />,
      title: "Eco-Friendly",
      description:
        "We prioritize sustainable sourcing and eco-conscious packaging to minimize our environmental footprint and protect our planet.",
    },
    {
      icon: <MdFavorite size={40} className="text-green-600" />,
      title: "Our Philosophy",
      description:
        "We champion a lifestyle rooted in harmony with nature, promoting inner balance, conscious choices, and sustainable living through our products and content.",
    },
    {
      icon: <MdEco size={40} className="text-green-600" />,
      title: "Versatile Uses",
      description:
        "From skincare to cooking, our coconut oil adapts to your needs, offering a natural solution for beauty, health, and household applications.",
    },
    {
      icon: <MdSpa size={40} className="text-green-600" />,
      title: "Community Focus",
      description:
        "We support local farmers and artisans, ensuring fair trade practices and fostering communities that share our passion for natural living.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="my-16 px-4 max-w-7xl mx-auto" ref={ref}>
      <h2 className="text-3xl font-bold mb-10 text-center text-green-700">
        Why Choose Oleodecoco
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {benefits.map(({ icon, title, description }, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center px-4 py-6 bg-white rounded-lg shadow-md"
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

export default BenefitsBlock;