import React from 'react';

const HeroSection = () => (
  <section className="relative flex flex-col items-center justify-center h-[450px] mt-6 w-[96%] mx-auto">
    <img 
      src="/images/banner.jpg" 
      alt="Banner" 
      className="w-full h-full object-cover shadow-lg"
    />
  </section>
);

export default HeroSection;
