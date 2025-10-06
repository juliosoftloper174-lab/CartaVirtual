import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full bg-black overflow-hidden flex items-center justify-center" 
         style={{ height: '70vh', minHeight: '500px' }}>
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/hamburguesa.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      
      {/* Lema sobre el video */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          <span className="block">LAS MEJORES HAMBURGUESAS</span>
          <span className="text-orange-400">DE LA CIUDAD</span>
        </h2>
        <p className="text-xl md:text-2xl text-white font-medium bg-black bg-opacity-50 inline-block px-6 py-2 rounded-full">
          ¡Sabor que enamora en cada bocado!
        </p>
      </div>
      
      {/* Overlay oscuro para mejor legibilidad */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  );
};

export default Hero;
