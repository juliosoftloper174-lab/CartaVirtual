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
import SettingsPage from "./pages/admin/SettingsPage";

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
        {/* Contenido principal */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0 md:ml-64 lg:ml-72">
          {/* Espacio para el menú fijo en escritorio */}
          <div className="hidden md:block fixed left-0 top-0 bottom-0 w-64 lg:w-72 bg-gray-900 text-white z-20">
            <Header className="h-full flex flex-col" />
          </div>
          
          {/* Contenido real */}
          <div className="md:pl-0 w-full">
          {/* Sección del video (solo en la página de inicio) */}
          {location.pathname === '/' && (
            <div className="relative h-[70vh] bg-black w-full -mt-16 md:mt-0 flex items-center justify-center overflow-hidden">
              <div className="w-full max-w-5xl px-4 h-[90%] flex items-center">
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
          )}

          {/* Contenido debajo del video */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <div className="space-y-8">
                      <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="food-splatter">
                              Explora
                            </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-primary-100 to-transparent"></div>
                        </div>
                        <div className="mb-4">
                          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-gray-900 uppercase tracking-wide">
                            <span className="relative inline-block">
                              <span className="relative z-10">Nuestras Categorías</span>
                              <span className="absolute -bottom-1.5 left-0 w-full h-1.5 sm:h-2 bg-yellow-400 -rotate-1 transform -skew-x-6 z-0"></span>
                            </span>
                          </h2>
                        </div>
                        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-8">
                          Descubre nuestra variedad de opciones deliciosas
                        </p>
                      </div>
                      <div className="px-4 sm:px-6">
                        <CategoryTabs 
                          categories={categories} 
                          selected={selectedCategory} 
                          onSelect={setSelectedCategory} 
                        />
                        <div className="mt-12 mb-8">
                          <div className="flex justify-center mb-2">
                            <div className="flex items-center gap-2 w-full max-w-2xl px-4">
                              <span className="food-splatter red-splatter">
                                Prueba
                              </span>
                              <div className="h-px flex-1 bg-gradient-to-r from-primary-100 to-transparent"></div>
                            </div>
                          </div>
                          <div className="mb-8 text-center">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-gray-900 uppercase tracking-wide text-center">
                              <span className="relative inline-block">
                                <span className="relative z-10">Nuestro Menú</span>
                                <span className="absolute -bottom-1.5 left-0 w-full h-1.5 sm:h-2 bg-red-500 -rotate-1 transform -skew-x-6 z-0"></span>
                              </span>
                            </h2>
                            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg whitespace-nowrap">
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
                  <Route 
                    path="settings" 
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
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
