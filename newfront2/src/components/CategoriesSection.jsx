import React from 'react';
import { 
  CakeIcon, 
  FireIcon, 
  GiftIcon, 
  HeartIcon, 
  SparklesIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const categories = [
  {
    id: 1,
    name: 'Hamburguesas',
    icon: <ShoppingBagIcon className="w-12 h-12 text-[#0F1880]" />
  },
  {
    id: 2,
    name: 'Bebidas',
    icon: <SparklesIcon className="w-12 h-12 text-blue-500" />
  },
  {
    id: 3,
    name: 'Postres',
    icon: <CakeIcon className="w-12 h-12 text-pink-500" />
  },
  {
    id: 4,
    name: 'Recomendado',
    icon: <FireIcon className="w-12 h-12 text-red-500" />
  },
  {
    id: 5,
    name: 'Ofertas',
    icon: <GiftIcon className="w-12 h-12 text-green-500" />
  }
];

const CategoryCard = ({ category, isMain = false }) => (
  <div className={`group flex flex-col items-center p-10 ${isMain ? 'bg-yellow-300 border-yellow-400 hover:bg-yellow-400' : 'bg-white border-gray-200 hover:bg-gray-50'} border-2 rounded-3xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer`}>
    <div className={`mb-6 p-4 ${isMain ? 'bg-yellow-200 group-hover:bg-yellow-300 border-yellow-300' : 'bg-gray-50 group-hover:bg-gray-100 border-gray-100'} rounded-full transition-all duration-200 border-2`}>
      {React.cloneElement(category.icon, { className: `w-10 h-10 ${isMain ? 'text-amber-800' : 'text-gray-700 group-hover:text-gray-800'}` })}
    </div>
    <h3 className={`text-lg font-medium ${isMain ? 'text-amber-900 font-bold' : 'text-gray-800 font-semibold'} font-sans`}>{category.name}</h3>
  </div>
);

const CategoriesSection = () => {
  return (
    <section className="w-full flex flex-col items-center mt-16 bg-gray-50 py-12 transition-colors duration-300">
      {/* Header Section */}
      <div className="w-[30%] py-4 bg-[#0F1880] flex justify-center">
        <h2 className="text-white text-2xl font-bold px-6 py-2">DESCUBRE NUESTRAS CATEGORÍAS</h2>
      </div>
      
      {/* Categories Grid */}
      <div className="w-11/12 max-w-6xl py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 px-4">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              isMain={index === 0} // La primera tarjeta será la principal
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
