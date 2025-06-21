import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: string;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/blog?category=${category}`} className="bg-green-100 text-green-800 px-4 py-2 rounded-full hover:bg-green-200 transition">
      {category}
    </Link>
  );
};

export default CategoryCard;