import { FiHeart, FiZap, FiSun, FiCoffee, FiSmile, FiBookOpen } from "react-icons/fi";


const tips = [
  {
    icon: <FiZap className="text-green-600 w-8 h-8" />,
    title: "Healthy Nutrition",
    description:
      "A balanced diet rich in vegetables and fruits promotes well-being and energy.",
  },
  {
    icon: <FiSun className="text-green-600 w-8 h-8" />,
    title: "Active Lifestyle",
    description:
      "Regular walks in fresh air and physical activity improve your mood and keep your body in shape.",
  },
  {
    icon: <FiCoffee className="text-green-600 w-8 h-8" />,
    title: "Proper Daily Routine",
    description:
      "Maintaining a consistent sleep and rest schedule helps preserve productivity and inner balance.",
  },
  {
    icon: <FiSmile className="text-green-600 w-8 h-8" />,
    title: "Positive Mindset",
    description:
      "Focusing on positivity and gratitude for small things improves life quality and reduces stress.",
  },
  {
    icon: <FiHeart className="text-green-600 w-8 h-8" />,
    title: "Self-Care",
    description:
      "Don’t forget to take time for rest and favorite activities — it strengthens mental health.",
  },
  {
    icon: <FiBookOpen className="text-green-600 w-8 h-8" />,
    title: "Lifelong Learning",
    description:
      "Continuous self-education keeps the mind sharp, expands horizons, and builds confidence.",
  },
];

const TipsBlock = () => {
  return (
    <section className="my-28 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-green-700">
        Helpful Tips
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TipsBlock;
