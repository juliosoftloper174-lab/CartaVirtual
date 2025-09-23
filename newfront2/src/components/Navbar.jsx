
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { id: 1, name: 'Menú', link: '#menu' },
    { id: 2, name: 'Promociones', link: '#promociones' },
    { id: 3, name: 'Locales', link: '#locales' },
  ];

  return (
    <header 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 w-[88%]`}
      style={{
        transform: 'translateX(-50%)',
        animation: 'slideDown 0.5s ease-out'
      }}
    >
      <style jsx>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .nav-link {
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          transform: translateY(-2px);
        }
        .menu-enter {
          opacity: 0;
          max-height: 0;
        }
        .menu-enter-active {
          opacity: 1;
          max-height: 500px;
          transition: all 0.3s ease-in-out;
        }
        .menu-exit {
          opacity: 1;
          max-height: 500px;
        }
        .menu-exit-active {
          opacity: 0;
          max-height: 0;
          transition: all 0.3s ease-in-out;
        }
      `}</style>

      <nav className="relative flex items-center justify-between p-2 bg-[#0F1880] rounded-full shadow-lg overflow-visible">
        {/* Logo */}
        <div className="flex-shrink-0 z-10 hover:scale-105 transition-transform -mt-8 -mb-8 ml-4">
          <img 
            src="/images/bembos.webp" 
            alt="Logo Bembos" 
            className={`w-32 h-32 object-contain transition-all duration-300 ${
              scrolled ? 'scale-90' : 'scale-100'
            }`} 
          />
        </div>

        {/* Right Section with Navigation and User Controls */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation - Moved to the right */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="nav-link px-4 py-2 text-white font-medium rounded-full hover:bg-white/20 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-2">
            {/* Account */}
            <div className="hidden md:flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 cursor-pointer hover:scale-102 transition-transform">
              <span className="text-sm font-medium text-white">Mi Cuenta</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Cart */}
            <button 
              className="relative p-2 rounded-full bg-white shadow-md hover:scale-105 transition-transform text-[#0F1880]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-10 0h10m0 0l2 2m-2-2l-2 2" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full active:scale-90 transition-transform text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden mt-2 bg-[#0F1880] rounded-2xl shadow-xl overflow-hidden ${
          menuOpen ? 'menu-enter-active' : 'menu-exit-active'
        }`}
        style={{
          maxHeight: menuOpen ? '500px' : '0',
          opacity: menuOpen ? 1 : 0,
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="block px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <a 
              href="#account" 
              className="flex items-center justify-between px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <span>Mi Cuenta</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
