import React from 'react';

const categoryIcons = {
  'Todos': '🍔',
  'Hamburguesas': '🍔',
  'Clásicas': '🍟',
  'Bebidas': '🥤',
  'Combos': '🍱',
  'Pollos': '🍗',
  'Parrillas': '🥩',
  'Postres': '🍰',
  'Ensaladas': '🥗',
  'Infantil': '👶'
};

const categoryOrder = {
  'Todos': 0,
  'Hamburguesas': 1,
  'Clásicas': 2,
  'Bebidas': 3,
  'Combos': 4,
  'Postres': 5,
  'Ensaladas': 6,
  'Infantil': 7
};

export default function CategoryTabs({ categories, selected, onSelect }) {
  // Filtrar categorías no deseadas
  const filteredCategories = categories.filter(category => category !== 'Parrillas' && category !== 'Pollos');
  
  // Separar 'Todos' del resto de categorías
  const todosCategory = filteredCategories.find(cat => cat === 'Todos');
  const otherCategories = filteredCategories.filter(cat => cat !== 'Todos');
  
  // Ordenar las demás categorías según el orden definido
  const sortedOtherCategories = [...otherCategories].sort((a, b) => {
    return (categoryOrder[a] || 99) - (categoryOrder[b] || 99);
  });
  
  // Combinar 'Todos' primero y luego el resto de categorías ordenadas
  const sortedCategories = todosCategory ? [todosCategory, ...sortedOtherCategories] : sortedOtherCategories;

  // Mapeo de categorías a imágenes de fondo
  const categoryBackgrounds = {
    'Todos': '/images/images (17).jpeg',
    'Hamburguesas': '/images/images (10).jpeg',
    'Clásicas': '/images/images (11).jpeg',
    'Bebidas': '/images/images (12).jpeg',
    'Combos': '/images/images (13).jpeg',
    'Postres': '/images/images (14).jpeg',
    'Ensaladas': '/images/images (15).jpeg',
    'Infantil': '/images/images (16).jpeg'
  };

  return (
    <div className="w-full p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {sortedCategories.map((category) => (
          <div key={category} className="group">
            <button
              onClick={() => onSelect(category)}
              className="w-full h-full flex flex-col items-center focus:outline-none"
            >
              <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 hover:scale-[1.02]">
                {/* Efecto de brillo al pasar el cursor */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
                </div>
                
                {/* Imagen con efecto de zoom y brillo mejorado */}
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <img 
                    src={categoryBackgrounds[category] || '/images/banner.png'} 
                    alt={category}
                    className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:brightness-110"
                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                  />
                  
                  {/* Overlay de gradiente con animación */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/70 group-hover:via-black/30 ${
                    selected === category ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                  }`}></div>
                  
                  {/* Efecto de iluminación en las esquinas */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-16 h-16 -mt-4 -ml-4 bg-white/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse-slow"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 -mb-4 -mr-4 bg-white/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse-slow group-hover:animation-delay-300"></div>
                  </div>
                </div>
                
                {/* Efecto de borde con resplandor */}
                <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                  selected === category 
                    ? 'border-primary-500 shadow-[0_0_15px_rgba(236,72,153,0.7)]' 
                    : 'border-white/30 group-hover:border-white/60 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                }`}></div>
              </div>
              
              {/* Título con efecto de subrayado */}
              <div className="relative px-2 text-center">
                <span className={`relative text-sm sm:text-base font-semibold ${
                  selected === category ? 'text-primary-600' : 'text-gray-800'
                } group-hover:text-primary-500 transition-colors duration-300`}>
                  {category}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                    selected === category ? 'w-full' : 'group-hover:w-full'
                  }`}></span>
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
