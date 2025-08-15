import { Link } from 'react-router-dom';
import { ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

export default function CartPage() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-12 text-center sm:px-6">
            <ShoppingBagIcon className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Tu carrito está vacío</h2>
            <p className="mt-1 text-gray-500">Añade algunos productos para continuar.</p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" />
                Ver menú
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Carrito de compras</h2>
            <button
              onClick={clearCart}
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Vaciar carrito
            </button>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="py-6">
                    <CartItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="mt-10 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</p>
                <p className="text-sm font-medium text-gray-900">S/ {totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-medium text-primary-600">S/ {totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Proceder al pago
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                o{' '}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Continuar comprando<span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
