import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

export default function MenuItem({ item }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(item);
    
    // Show "Added" feedback
    setShowAdded(true);
    
    // Reset states after animation
    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => setShowAdded(false), 1000);
    }, 1000);
  };
  return (
    <article className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary-100">
      {/* Product Image */}
      <div className="relative pt-[75%] bg-gray-50 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
          }}
        />
        {item.isNew && (
          <span className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Nuevo
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col h-full">
        {/* Price at the top */}
        <div className="mb-2">
          <span className="text-2xl font-bold text-primary-600">
            S/ {typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
          </span>
        </div>
        
        {/* Name and description in the middle */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
        
        {/* Full width button at the bottom */}
        <div className="mt-2 w-full">
          <button
            onClick={handleAddToCart}
            disabled={isAdding || showAdded}
            className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-300 transform ${
              isAdding || showAdded
                ? 'bg-green-600 scale-100'
                : 'bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-gray-900/30'
            } text-white font-semibold`}
            aria-label={showAdded ? '¡Agregado!' : 'Agregar al carrito'}
          >
              {showAdded ? (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">¡Listo!</span>
                </div>
              ) : isAdding ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm">Agregando...</span>
                </div>
              ) : (
                <span className="text-base font-semibold">ORDENAR</span>
              )}
            </button>
          </div>
        </div>
    </article>
  );
}
