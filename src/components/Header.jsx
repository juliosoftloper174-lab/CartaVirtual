import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

export default function Header({ className = '' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-gray-900 text-white ${isScrolled ? 'shadow-lg' : ''} transition-all duration-300`}>
      <div className="container mx-auto flex h-36 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img 
            src="/images/logo1.jpg" 
            alt="Logo de la hamburguesería" 
            className="h-28 w-28 rounded-full object-cover border-2 border-primary-500 shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold font-display text-white">Burguer Peru</h1>
            <p className="text-base text-gray-300">Sabor peruano en cada bocado</p>
          </div>
        </div>

        {/* Navegación principal */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">Inicio</Link>
          <a href="#menu" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">Menú</a>
          <a href="#promociones" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">Promociones</a>
          <a href="#contacto" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">Contacto</a>
        </nav>

        {/* Botón de carrito */}
        <div className="flex items-center">
          <Link
            to="/carrito"
            className="relative p-2 text-gray-300 hover:text-primary-400 transition-colors"
            aria-label="Carrito de compras"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-medium text-white">
              {totalItems > 0 ? totalItems : null}
            </span>
          </Link>
          
          <Link to="/login">
            <button className="ml-4 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
