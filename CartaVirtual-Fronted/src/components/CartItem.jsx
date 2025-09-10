import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-md object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-food.jpg';
          }}
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="px-3 py-1 text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-sm font-medium text-gray-900">
            S/ {(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
