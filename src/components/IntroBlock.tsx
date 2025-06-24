import React from "react";

const IntroBlock: React.FC = () => {
  return (
    <section className="relative w-full h-[500px] mb-16 overflow-hidden">
      {/* Фоновая картинка */}
      <div className="absolute inset-0 w-screen h-full -left-[calc((100vw-100%)/2)]">
        <img
          src="/homeCocos.jpg"
          alt="Coconut background"
          className="w-full h-full object-cover z-0"
        />
      </div>


      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" />

      <div className="relative z-20 max-w-4xl mx-auto p-10 rounded-2xl bg-white/90 shadow-md mt-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Oleodecoco
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed text-lg">
          Oleodecoco is a space dedicated to natural care — where coconut oil stands as a symbol of purity,
          balance, and simplicity. We believe that true wellness begins with nature’s wisdom, passed down through generations.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed text-lg">
          Explore our insights, rituals, and tips on natural oils, skincare, and mindful living.
          From traditional remedies to modern self-care practices — our goal is to support your path to a healthier, more natural lifestyle.
        </p>
        <p className="text-gray-600 text-sm italic">
          Inspired by nature. Rooted in simplicity. Guided by well-being.
        </p>
      </div>
    </section>
  );
};

export default IntroBlock;