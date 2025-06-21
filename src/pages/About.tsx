import authorsData from '../data/authors.json';
import type { IAuthor } from '../types/author';

const About = () => {
  const authors: IAuthor[] = authorsData;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p className="text-lg mb-6">
        Welcome to Coconut Oil Blog! We are passionate about sharing the amazing benefits of coconut oil for health, beauty, and natural therapy.
      </p>
      <h2 className="text-2xl font-bold mb-4">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {authors.map((author) => (
          <div key={author.id} className="bg-white p-6 rounded-lg shadow-md">
            {author.avatar && <img src={author.avatar} alt={author.name} className="w-24 h-24 rounded-full mx-auto mb-4" />}
            <h3 className="text-xl font-semibold">{author.name}</h3>
            <p className="text-gray-600">{author.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;