// React & Router
import { useState } from "react";
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa'; // Íconos
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

// Contexts
import { CartProvider } from "./contexts/CartContext";

// Components
import Header from "./components/Header";
import ActionBar from "./components/ActionBar";
import CategoryTabs from "./components/CategoryTabs";
import MenuSection from "./components/MenuSection";
import MobileMenu from "./components/MobileMenu";

// Pages
import CartPage from "./pages/CartPage";
import NewLoginPage from "./pages/NewLoginPage";
import RegisterPage from "./pages/RegisterPage";
import TermsPage from "./pages/TermsPage";
import DashboardPage from "./pages/admin/DashboardPage";
import CategoriesPage from "./pages/admin/CategoriesPage";

// Data
import { menu } from "./data/menu";

// Componente de ruta protegida (temporalmente desactivada para pruebas)
const ProtectedRoute = ({ children }) => {
  // Temporalmente siempre retornar los children para pruebas
  // En producción, descomentar el código de abajo
  return children;
  
  /*
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
  */
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  // No usar useCart aquí, ya que puede causar problemas de contexto
  
  // Categorías del menú
  const categories = ["Todos", ...new Set(menu.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtrar menú por categoría seleccionada
  const filteredMenu = selectedCategory === "Todos"
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  return (
    <CartProvider>
      <div className="flex flex-col h-screen overflow-hidden relative" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Header fijo en la parte superior */}
        <div className="w-full bg-black text-white fixed top-0 left-0 z-50">
          <Header className="w-full" />
        </div>
        
        {/* Contenido principal */}
        <div className="flex-1 overflow-y-auto">
          {/* Contenido real */}
          <div className="w-full">
            {/* Sección del video (solo en la página de inicio) */}
            {location.pathname === '/' && (
              <>
                <div className="relative h-[85vh] bg-black w-full flex items-center justify-center overflow-hidden">
                  <div className="w-full max-w-5xl px-4 h-[95%] flex items-center">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src="https://www.youtube.com/embed/bBxl03JzeDY?si=5pLC6m11LxD8P7UF&autoplay=1&mute=1&loop=1&playlist=bBxl03JzeDY&controls=1&showinfo=0&rel=0"
                        title="Bembos - Experiencia única"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
                
                {/* Barra de acción con botones e información de contacto */}
                <ActionBar />

                {/* Sección de especialidad de la casa */}
                <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                  {/* Efecto de mancha de mostaza */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-100 opacity-30"></div>
                    <img 
                      src="/images/mostaza.jpg" 
                      alt="" 
                      className="w-full h-full object-cover opacity-70"
                      style={{
                        mixBlendMode: 'multiply',
                        objectPosition: 'center',
                      }}
                    />
                  </div>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-8 text-center">
                      <div className="mb-2 flex justify-center">
                        <span className="food-splatter">
                          Especial
                        </span>
                      </div>
                      <div className="mb-8">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-gray-900 uppercase tracking-wide inline-block">
                          <span className="relative">
                            <span className="relative z-10">Nuestra Especialidad</span>
                            <span className="absolute -bottom-1.5 left-0 w-full h-1.5 sm:h-2 bg-yellow-400 -rotate-1 transform -skew-x-6 z-0"></span>
                          </span>
                        </h2>
                        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                          La experiencia culinaria que estabas esperando
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        {/* Imagen */}
                        <div className="lg:w-1/2 h-96 lg:h-auto overflow-hidden">
                          <img 
                            src="/images/imagen23.jpeg" 
                            alt="La Especialidad de la Casa" 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        
                        {/* Contenido */}
                        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            ¡Hamburguesa Bembos Especial!
                          </h3>
                          <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            Descubre el sabor inigualable de nuestra hamburguesa estrella, preparada con los ingredientes más frescos y seleccionados cuidadosamente para ofrecerte una experiencia gastronómica única.
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start">
                              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700">Carne 100% res</span>
                            </div>
                            <div className="flex items-start">
                              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700">Quesos importados</span>
                            </div>
                            <div className="flex items-start">
                              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700">Verduras frescas</span>
                            </div>
                            <div className="flex items-start">
                              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                                <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700">Pan artesanal</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex-1 text-center border border-gray-700 hover:shadow-md">
                              Ordenar Ahora
                            </button>
                            <button className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex-1 text-center">
                              Ver Detalles
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

          {/* Contenido principal */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <div className="space-y-8">
                      <div className="px-4 sm:px-6 text-center">
                        <div className="mb-2 flex justify-center">
                          <span className="food-splatter">
                            Explora
                          </span>
                        </div>
                        <div className="mb-4">
                          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-gray-900 uppercase tracking-wide inline-block">
                            <span className="relative">
                              <span className="relative z-10">Nuestras Categorías</span>
                              <span className="absolute -bottom-1.5 left-0 w-full h-1.5 sm:h-2 bg-yellow-400 -rotate-1 transform -skew-x-6 z-0"></span>
                            </span>
                          </h2>
                        </div>
                        <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                          Descubre nuestra variedad de opciones deliciosas
                        </p>
                        <CategoryTabs 
                          categories={categories} 
                          selected={selectedCategory} 
                          onSelect={setSelectedCategory} 
                        />
                      </div>
                      <div className="px-4 sm:px-6 text-center">
                        <div className="mt-12 mb-8">
                          <div className="mb-2 flex justify-center">
                            <span className="food-splatter">
                              Nuestro Menú
                            </span>
                          </div>
                          <div className="mb-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-gray-900 uppercase tracking-wide inline-block">
                              <span className="relative">
                                <span className="relative z-10">Nuestro Menú</span>
                                <span className="absolute -bottom-1.5 left-0 w-full h-1.5 sm:h-2 bg-yellow-400 -rotate-1 transform -skew-x-6 z-0"></span>
                              </span>
                            </h2>
                            <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                              Deléitate con nuestras hamburguesas artesanales de gran sabor
                            </p>
                          </div>
                        </div>
                        <MenuSection items={filteredMenu} />
                      </div>
                    </div>
                  } 
                />
                
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/login" element={<NewLoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/terminos" element={<TermsPage />} />
                <Route path="/admin">
                  <Route 
                    index 
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="dashboard" 
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="categorias" 
                    element={
                      <ProtectedRoute>
                        <CategoriesPage />
                      </ProtectedRoute>
                    } 
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botón flotante de WhatsApp (solo en móviles) */}
      {!isAdminRoute && (
        <a
          href="https://wa.me/51987654321"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-green-500 text-white rounded-full shadow-lg z-50 animate-pulse p-3 md:p-4"
          style={{
            animation: 'pulse 2s infinite',
            bottom: '6rem', // Ajusta la posición vertical del botón
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.animation = 'none';
            e.currentTarget.style.boxShadow = '0 0 0 0 rgba(37, 211, 102, 0.7)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.animation = 'pulse 2s infinite';
          }}
        >
          <FaWhatsapp className="h-10 w-10" />
        </a>
      )}
      
      {/* Barra de navegación inferior (solo en móviles) */}
      <MobileMenu />
    </div>
  </CartProvider>
  );
}

export default App;
