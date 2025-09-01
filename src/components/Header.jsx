import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
        }, 2000);
      }
    } else {
      // Borrando el texto
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, speed / 2);
      } 
      // Texto completamente borrado, reiniciar
      else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentIndex(0);
        }, repeatDelay);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isDeleting, displayedText, repeatDelay]);

  return <span className={`inline-block ${className}`}>{displayedText}</span>;
};

export default function Header({ className = '' }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`w-full bg-black text-white shadow-md ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo y título */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/images/logo1.png" 
                alt="Logo" 
                className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-orange-500 transition-all duration-300 hover:scale-105 transform-gpu"
                style={{
                  imageRendering: 'crisp-edges',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/logo1.jpg';
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">BEMBOS</h1>
              <div className="flex items-center">
                <TypingAnimation 
                  text="Sabor en cada bocado!" 
                  speed={100}
                  className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500"
                />
                <span className="inline-block w-1 h-4 bg-orange-500 ml-1 animate-pulse"></span>
              </div>
            </div>
          </Link>

          {/* Navegación */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-8 h-full">
            <Link to="/" className="px-3 py-2 text-white hover:text-orange-400 transition-colors font-semibold text-lg flex items-center h-full border-b-2 border-transparent hover:border-orange-500">
              Inicio
            </Link>
            <Link to="/menu" className="px-3 py-2 text-white hover:text-orange-400 transition-colors font-semibold text-lg flex items-center h-full border-b-2 border-transparent hover:border-orange-500">
              Menú
            </Link>
            <Link to="/sobre-nosotros" className="px-3 py-2 text-white hover:text-orange-400 transition-colors font-semibold text-lg flex items-center h-full border-b-2 border-transparent hover:border-orange-500">
              Sobre Nosotros
            </Link>
            <Link to="/contacto" className="px-3 py-2 text-white hover:text-orange-400 transition-colors font-semibold text-lg flex items-center h-full border-b-2 border-transparent hover:border-orange-500">
              Contacto
            </Link>
            <Link to="/terminos" className="px-3 py-2 text-white hover:text-orange-400 transition-colors font-semibold text-lg flex items-center h-full border-b-2 border-transparent hover:border-orange-500">
              Términos
            </Link>
          </nav>

          {/* Menú móvil */}
          <button className="md:hidden text-white focus:outline-none p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
