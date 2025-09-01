import React from 'react';

// No more emojis, we'll use a cleaner design
const categoryColors = {
  'Todos': 'from-blue-400 to-indigo-500',
  'Hamburguesas': 'from-amber-500 to-red-500',
  'Clásicas': 'from-yellow-400 to-orange-500',
  'Bebidas': 'from-sky-400 to-blue-600',
  'Combos': 'from-purple-400 to-pink-500',
  'Postres': 'from-pink-400 to-rose-500',
  'Ensaladas': 'from-emerald-400 to-teal-500',
  'Infantil': 'from-fuchsia-400 to-purple-500',
  'Especiales': 'from-rose-500 to-pink-600'
};

const categoryOrder = {
  'Todos': 0,
  'Hamburguesas': 1,
  'Clásicas': 2,
  'Bebidas': 3,
  'Combos': 4,
  'Postres': 5,
  'Ensaladas': 6,
  'Infantil': 7,
  'Especiales': 8
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
    'Todos': '/images/images (18).jpeg' + '?v=' + new Date().getTime(),
    'Hamburguesas': '/images/images (8).jpeg' + '?v=' + new Date().getTime(),
    'Clásicas': '/images/images (11).jpeg',
    'Bebidas': '/images/bebidas.jpg',
    'Combos': '/images/images (13).jpeg',
    'Postres': '/images/postres.jpg',
    'Ensaladas': '/images/images (15).jpeg',
    'Infantil': '/images/images (16).jpeg',
    'Especiales': '/images/imagen23.jpeg'
  };

  return (
    <div className="w-full p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {sortedCategories.map((category, index) => (
          <div key={category} className="group relative">
            <button
              onClick={() => onSelect(category)}
              className="w-full flex flex-col items-center focus:outline-none"
            >
              <div className="relative w-full aspect-square group">
                {/* Blob effect background */}
                <div className="absolute inset-0 z-0">
                  <div className={`absolute inset-0 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] bg-gradient-to-br ${categoryColors[category] || 'from-gray-400 to-gray-600'} opacity-20`}></div>
                </div>
                
                {/* Image container with blob shape */}
                <div className="relative w-full h-full overflow-hidden rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] border-2 border-white/80 shadow-lg transition-all duration-500 ease-out group-hover:scale-105 hover:rounded-[40%_60%_50%_50%_/_40%_50%_50%_60%]">
                  <img 
                    src={categoryBackgrounds[category] || '/images/banner.png'} 
                    alt={category}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  
                  {/* Simple overlay */}
                  <div className={`absolute inset-0 ${
                    selected === category ? 'bg-black/20' : 'bg-black/10 group-hover:bg-black/20'
                  } transition-colors duration-200`}></div>
                </div>
                
                {/* Selection indicator */}
                {selected === category && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-400 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                
                {/* Category indicator */}
                <div className={`absolute bottom-0 left-0 w-full h-1 ${
                  selected === category ? 'bg-primary-400' : 'bg-gray-300'
                }`}></div>
                
                {/* Category indicator with gradient */}
                <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${
                  categoryColors[category] || 'from-gray-400 to-gray-600'
                } rounded-b-lg transition-all duration-500 ${
                  selected === category ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
              </div>
            </button>

            {/* Enhanced category name with modern typography */}
            <div className="w-full px-1 mt-2">
              <div className="relative h-10 flex items-start">
                <h3 className={`text-[15.5px] sm:text-[16.5px] font-sans font-bold text-left w-full tracking-tight ${
                  selected === category 
                    ? 'text-gray-900' 
                    : 'text-gray-800 group-hover:text-gray-900'
                } transition-all duration-300 leading-tight`}>
                  {category}
                </h3>
                
                {/* Simple divider for selected category */}
                {selected === category && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gray-300 rounded-full"></div>
                )}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
