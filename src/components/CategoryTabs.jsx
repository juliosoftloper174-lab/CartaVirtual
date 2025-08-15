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

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {sortedCategories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`group flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1
              ${selected === category 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg ring-2 ring-primary-400' 
                : 'bg-white text-gray-700 shadow-sm hover:shadow-md hover:ring-1 hover:ring-gray-200'}
              w-full h-full aspect-square`}
          >
            <span className={`text-5xl mb-3 transition-transform duration-300 group-hover:scale-110 ${selected === category ? 'text-white' : 'text-primary-500'}`}>
              {categoryIcons[category] || '🍽️'}
            </span>
            <span className={`font-semibold text-center ${selected === category ? 'text-white' : 'text-gray-700'}`}>
              {category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
