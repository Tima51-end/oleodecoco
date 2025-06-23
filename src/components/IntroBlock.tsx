import React from "react";

const IntroBlock: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-md mb-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Oleodecoco
      </h1>
      <p className="text-gray-700 mb-4 leading-relaxed text-lg">
        This site is dedicated to sharing valuable insights and stories related 
        to natural oils, wellness, and lifestyle. While originally focused on coconut-based products, 
        we now explore a broader range of topics to bring you useful and engaging content.
      </p>
      <p className="text-gray-700 mb-4 leading-relaxed text-lg">
        Here you'll find a variety of articles, tips, and inspiration to help you live a healthier 
        and more balanced life. Enjoy browsing through our curated posts and feel free to reach out 
        with your feedback.
      </p>
      <p className="text-gray-600 text-sm italic">
        Our goal is to provide meaningful content that enriches your everyday experience.
      </p>
    </section>
  );
};

export default IntroBlock;
