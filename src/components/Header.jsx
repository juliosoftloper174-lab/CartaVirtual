import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

// Componente para la animación de escritura
const TypingAnimation = ({ text, speed = 100, className = '', repeatDelay = 3000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    
    if (!isDeleting) {
      // Escribiendo el texto
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
      } 
      // Completado el texto, esperar y comenzar a borrar
      else if (currentIndex === text.length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Esperar 2 segundos antes de empezar a borrar
      }
    } else {
      // Borrando el texto
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, speed / 2); // Borrar más rápido que escribir
      } 
      // Texto completamente borrado, reiniciar
      else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentIndex(0);
        }, repeatDelay); // Esperar 3 segundos antes de reiniciar
      }
    }
    
    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isDeleting, displayedText, repeatDelay]);

  return <span className={`inline-block ${className}`}>{displayedText}</span>;
};

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

  // Números de WhatsApp aleatorios (prefijo peruano +51)
  const whatsappNumbers = [
    '51987654321',
    '51998765432',
    '51987651234',
    '51987659876',
    '51987654321'
  ];
  
  // Función para obtener un número aleatorio
  const getRandomWhatsAppNumber = () => {
    const randomIndex = Math.floor(Math.random() * whatsappNumbers.length);
    return whatsappNumbers[randomIndex];
  };
  
  const whatsappLink = `https://wa.me/${getRandomWhatsAppNumber()}?text=¡Hola!%20Quisiera%20hacer%20un%20pedido`;

  return (
    <div className={`${className} w-full bg-black text-white flex flex-col h-full`}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex flex-col items-center flex-shrink-0">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <Link to="/" className="flex flex-col items-center">
              <img 
                src="/images/logo1.png" 
                alt="Logo de la hamburguesería" 
                className="h-40 w-40 rounded-full object-cover border-2 border-primary-500 shadow-lg mb-4 hover:opacity-90 transition-opacity"
              />
              <h1 className="text-2xl font-bold font-display text-white text-center mb-2 hover:text-primary-400 transition-colors">BEMBOS</h1>
            </Link>
          <div className="w-full pt-2 group">
            <div className="flex items-center justify-center min-h-[28px]">
              <TypingAnimation 
                text="Sabor en cada bocado!" 
                speed={100}
                className="text-[20px] md:text-[22px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-center"
              />
              <span className="inline-block w-1 h-6 bg-pink-500 ml-1 animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Espacio entre el logo y la información de contacto */}
        <div className="mt-16"></div>
      </div>

      {/* Información de contacto */}
      <div className="px-4 py-2 text-gray-400 text-sm">
        <div className="space-y-3">
          <div className="flex items-start">
            <svg className="h-5 w-5 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Av. Principal 123, Lima, Perú</span>
          </div>
          <div className="flex items-start">
            <svg className="h-5 w-5 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+51 987 654 321</span>
          </div>
          <div className="flex items-start">
            <svg className="h-5 w-5 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p>Lun - Vie: 12:00 PM - 10:00 PM</p>
              <p>Sáb - Dom: 1:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de botones */}
      <div className="mt-2 px-4 pb-4 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          {/* Botón Ordenar */}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
            <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors relative overflow-hidden group shadow-lg hover:shadow-xl hover:shadow-red-900/30">
              <span className="relative z-10 flex items-center">
                <ShoppingBagIcon className="h-5 w-5" />
                <span className="ml-2 text-sm font-medium animate-text-pulse">¡ORDENA AHORA!</span>
              </span>
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></span>
            </button>
          </a>
          
          {/* Botón Carrito */}
          <Link to="/carrito" className="block">
            <button className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2.5 px-4 rounded-lg transition-colors relative border-2 border-gray-200 group">
              <ShoppingCartIcon className="h-5 w-5 text-gray-800 font-bold" />
              <span className="text-sm font-semibold">Ver Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>

          {/* Botón Iniciar Sesión */}
          <div className="pt-3">
            <Link to="/login" className="block">
              <button className="w-full flex items-center justify-center space-x-2 bg-black hover:bg-gray-900 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium">Iniciar Sesión</span>
              </button>
            </Link>
          </div>
          </div>
        </div>
      </div>
      
      {/* Espacio para asegurar que el contenido no quede detrás del botón de WhatsApp */}
      <div className="h-20 flex-shrink-0"></div>
    </div>
  );
}
