import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, ShoppingBagIcon, UserIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

// Números de WhatsApp aleatorios (prefijo peruano +51)
const whatsappNumbers = [
  '51987654321',
  '51998765432',
  '51987651234',
  '51987659876',
  '51987654321'
];

const getRandomWhatsAppNumber = () => {
  const randomIndex = Math.floor(Math.random() * whatsappNumbers.length);
  return whatsappNumbers[randomIndex];
};

const whatsappLink = `https://wa.me/${getRandomWhatsAppNumber()}?text=¡Hola!%20Quisiera%20hacer%20un%20pedido`;

export default function ActionBar() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactItems = [
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: 'Ubicación',
      value: 'Lima, Perú',
      className: 'from-emerald-500 to-teal-500',
      href: '#ubicacion'
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: 'Llámanos',
      value: '+51 987 654 321',
      className: 'from-orange-500 to-amber-500',
      href: `tel:${getRandomWhatsAppNumber()}`
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: 'Horario',
      value: '12:00 PM - 11:00 PM',
      className: 'from-purple-500 to-indigo-500',
      href: '#horario'
    }
  ];

  return (
    <div className="relative z-40 bg-gradient-to-b from-black/90 to-black/95 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Contact Info - Only visible on larger screens */}
          <div className="hidden lg:flex items-center space-x-8">
            {contactItems.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.className} shadow-lg`}>
                  {React.cloneElement(item.icon, { className: 'h-5 w-5 text-white' })}
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{item.title}</p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            <Link 
              to="/carrito" 
              className={`relative flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 border border-white/10`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="text-sm sm:text-base">Ver Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 lg:flex-none flex items-center justify-center space-x-2 bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 hover:shadow-orange-500/30"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <span className="text-sm sm:text-base">Ordenar Ahora</span>
            </a>
            
            <Link 
              to="/login" 
              className="hidden lg:flex items-center justify-center p-3.5 bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              title="Iniciar Sesión"
            >
              <UserIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        {/* Mobile Contact Bar - Only visible on small screens */}
        <div className="lg:hidden grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
          {contactItems.map((item, index) => (
            <a 
              key={index}
              href={item.href}
              className="flex flex-col items-center justify-center text-center p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
            >
              <div className={`p-2 rounded-lg ${index === 1 ? 'bg-gradient-to-br from-orange-500 to-amber-500' : 'bg-white/10'}`}>
                {React.cloneElement(item.icon, { 
                  className: `h-4 w-4 ${index === 1 ? 'text-white' : 'text-gray-300'}` 
                })}
              </div>
              <span className="text-xs mt-1.5 text-gray-300">{item.title}</span>
            </a>
          ))}
          <Link 
            to="/login" 
            className="flex flex-col items-center justify-center text-center p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
          >
            <div className="p-2 rounded-lg bg-white/10">
              <UserIcon className="h-4 w-4 text-gray-300" />
            </div>
            <span className="text-xs mt-1.5 text-gray-300">Cuenta</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
