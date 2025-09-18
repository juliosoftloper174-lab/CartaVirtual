
import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-[96%] mx-auto bg-[#0F1880] rounded-t-2xl rounded-b-2xl shadow-md px-4 py-0 mt-2">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="flex items-center min-w-[60px]">
              <img src="/images/bembos.webp" alt="Logo Bembos" className="w-[100px] h-[100px] object-contain" />
        </div>
        {/* Center Links */}
        <ul className="hidden md:flex gap-8 items-center mx-auto">
          <li><a href="#menu" className="text-white font-bold text-xl hover:underline">Menú</a></li>
          <li><a href="#promociones" className="text-white font-bold text-xl hover:underline">Promociones</a></li>
          <li><a href="#locales" className="text-white font-bold text-xl hover:underline">Locales</a></li>
        </ul>
        {/* Right Block */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2 min-w-[90px]">
            <span className="text-white text-xs">Hola</span>
            <span className="text-white font-semibold text-sm cursor-pointer">Mi Cuenta <span className="text-xs">▼</span></span>
          </div>
          {/* Cart Button */}
          <button className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-blue-100 transition">
            {/* Cart Icon (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#0033A0]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-[#0F1880] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </button>
          {/* Hamburger for mobile */}
          <button className="md:hidden ml-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 mt-2 bg-[#0F1880] rounded-b-2xl py-4">
          <li><a href="#menu" className="text-white font-bold text-xl">Menú</a></li>
          <li><a href="#promociones" className="text-white font-bold text-xl">Promociones</a></li>
          <li><a href="#locales" className="text-white font-bold text-xl">Locales</a></li>
          <li className="flex flex-col items-end w-full pr-8 mt-2">
            <span className="text-white text-sm">Hola</span>
            <span className="text-white font-semibold text-base cursor-pointer">Mi Cuenta <span className="text-sm">▼</span></span>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
