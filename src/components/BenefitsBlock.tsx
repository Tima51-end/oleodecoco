import {
  MdEco,
  MdSpa,
  MdLocalHospital,
  MdStar,
  MdNaturePeople,
  MdFavorite,
} from "react-icons/md";

const benefits = [
  {
    icon: <MdEco size={40} className="text-green-600" />,
    title: "Natural Ingredients",
    description:
      "Our products are made from 100% natural ingredients, ensuring safety and sustainability.",
  },
  {
    icon: <MdSpa size={40} className="text-green-600" />,
    title: "Skin Friendly",
    description:
      "Gentle on all skin types, promoting health and vitality without irritation.",
  },
  {
    icon: <MdLocalHospital size={40} className="text-green-600" />,
    title: "Health Benefits",
    description:
      "Supports immune system and overall wellness through natural antioxidants.",
  },
  {
    icon: <MdStar size={40} className="text-green-600" />,
    title: "High Quality",
    description:
      "Produced under strict quality controls to deliver the best experience.",
  },
  {
    icon: <MdNaturePeople size={40} className="text-green-600" />,
    title: "Eco-Friendly",
    description:
      "Committed to environmental protection with sustainable sourcing and packaging.",
  },
  // Добавляем философию как последний элемент массива
  {
    icon: <MdFavorite size={40} className="text-green-600" />,
    title: "Our Philosophy",
    description:
      "We believe in harmony with nature and the importance of inner balance. Our mission is to offer products that support a conscious, healthy, and sustainable lifestyle.",
  },
];

const BenefitsBlock = () => {
  return (
    <section className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-green-700">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {benefits.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-4 py-6"
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

export default BenefitsBlock;
