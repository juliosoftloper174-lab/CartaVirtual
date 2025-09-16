import React from 'react';

const Home = () => {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      <section className="w-full min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        {/* Iconos de redes sociales */}
  <div className="absolute top-1/2 left-12 -translate-y-1/2 flex flex-col gap-4 z-30">
          <img src="/images/ig.jpg" alt="Instagram" className="w-12 h-12 rounded-full shadow-lg bg-white p-2 hover:scale-110 transition-transform duration-200" />
          <img src="/images/tiktok.jpg" alt="TikTok" className="w-12 h-12 rounded-full shadow-lg bg-white p-2 hover:scale-110 transition-transform duration-200" />
        </div>
        <img
          src="/images/banner.jpg"
          alt="Banner"
          className="object-cover w-full h-full absolute inset-0 z-0"
          style={{ imageRendering: 'auto', filter: 'contrast(1.1) brightness(1.05)' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
        <div className="relative z-20 text-center text-white w-full">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Bienvenido a la página Home</h1>
          <p className="text-lg drop-shadow">Esta es la sección hero con tu banner.</p>
        </div>
      </section>
      {/* Puedes agregar más contenido aquí */}
    </main>
  );
};

export default Home;
