const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-20">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-12 md:mb-16 text-gray-900 text-center tracking-wide">
        About Us
      </h1>

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-base md:text-lg text-gray-500 text-center mb-8">
          Last Updated: June 24, 2025, 04:02 PM CEST
        </div>

        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-4">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
            Welcome to our website! We are a dedicated platform designed for those who love to explore, learn, and enjoy themselves. Our mission is to create a space where knowledge and entertainment converge, delivering content that enriches the leisure time of every reader. Here, you’ll find a wide array of informative articles, fascinating trivia, practical guides, in-depth insights, and opinions on diverse topics—all crafted to inspire, educate, and provoke thought.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-4">
            Our Philosophy
          </h2>
          <ul className="list-disc list-inside space-y-6 text-gray-600 text-lg md:text-xl">
            <li>
              We believe that knowledge should be accessible to everyone, regardless of age, interests, or experience level.
            </li>
            <li>
              Our team of authors and contributors works diligently every day to curate and create high-quality content.
            </li>
            <li>
              We are committed to providing reliable information, written in a clear and engaging manner, ensuring every reader discovers valuable insights tailored to their needs.
            </li>
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-4">
            What We Offer
          </h2>
          <ul className="list-disc list-inside space-y-6 text-gray-600 text-lg md:text-xl">
            <li>
              A broad variety of categories, including health and wellness, technology, lifestyle, and more, catering to all passions.
            </li>
            <li>
              Each article is enhanced with captivating images and multimedia content for a pleasant and immersive reading experience.
            </li>
            <li>
              Regularly updated content to keep you informed and engaged with the latest trends and insights.
            </li>
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-4">
            Why Join Us?
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
            Our goal is to build a community of curious and passionate readers who are always eager to learn something new. Whether you want to dive deep into a specific topic, unwind with an engaging read, or find inspiration, you’ll always discover fresh content here. We invite you to subscribe to our newsletter to receive the latest updates directly in your inbox. Follow us on social media to stay connected and interact with our vibrant community!
          </p>
        </section>

        <section className="space-y-8">
          <p className="text-gray-600 leading-relaxed text-lg md:text-xl text-center">
            Thank you for being here, and happy reading! We look forward to accompanying you on your journey of discovery and growth.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;