import React from 'react';

const HeroSection = () => (
  <section className="relative flex flex-col items-center justify-center h-[503px] mt-40 w-[97%] mx-auto">
    <img 
      src="/images/banner2.jpg" 
      alt="Banner" 
      className="w-full h-full object-cover object-top"
      style={{
        objectPosition: 'center 70%'
      }}
    />
    
    {/* Social Media Icons - Left Center */}
    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
      <a 
        href="https://www.instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white/90 p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center w-12 h-12"
        aria-label="Instagram"
      >
        <img 
          src="/images/ig.jpg" 
          alt="Instagram" 
          className="w-full h-full rounded-full object-cover"
        />
      </a>
      <a 
        href="https://www.tiktok.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white/90 p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center w-12 h-12"
        aria-label="TikTok"
      >
        <img 
          src="/images/tiktok.jpg" 
          alt="TikTok" 
          className="w-full h-full rounded-full object-cover"
        />
      </a>
    </div>
  </section>
);

export default HeroSection;
