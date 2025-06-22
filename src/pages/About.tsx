import authorsData from "../data/authors.json";
import type { IAuthor } from "../types/author";

const About = () => {
  const authors: IAuthor[] = authorsData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">About Us</h1>

      <div className="text-lg mb-12 text-gray-700 max-w-3xl mx-auto leading-relaxed space-y-8">
        <p>
          Welcome to Oleodecoco! We are passionate about sharing the amazing
          benefits of coconut oil for health, beauty, and natural therapy.
        </p>

        {authors.map((author) => (
          <div key={author.id}>
            <h3 className="text-xl font-bold text-gray-900">{author.name}</h3>
            <p className="text-gray-600 text-base">{author.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
