// React & Router
import { useState } from "react";
import { FaWhatsapp } from 'react-icons/fa'; // Ícono oficial de WhatsApp
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Contexts
import { CartProvider } from "./contexts/CartContext";

// Components
import Header from "./components/Header";
import CategoryTabs from "./components/CategoryTabs";
import MenuSection from "./components/MenuSection";

// Pages
import CartPage from "./pages/CartPage";
import NewLoginPage from "./pages/NewLoginPage";
import RegisterPage from "./pages/RegisterPage";
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
  
  // Categorías del menú
  const categories = ["Todos", ...new Set(menu.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtrar menú por categoría seleccionada
  const filteredMenu = selectedCategory === "Todos"
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  return (
    <CartProvider>
      <div className="flex h-screen overflow-hidden relative" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Menú lateral fijo */}
        <div className="w-[17rem] bg-gray-900 text-white fixed left-0 top-0 bottom-0 overflow-hidden z-10">
          <Header className="h-full flex flex-col" />
        </div>
        
        {/* Contenido principal */}
        <div className="flex-1 ml-[17rem] overflow-y-auto">
          {/* Sección del video (solo en la página de inicio) */}
          {location.pathname === '/' && (
            <div className="relative h-[70vh] bg-black">
              <div className="h-full flex items-center">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
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
                          <div className="mb-2">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-gray-900 uppercase tracking-wide text-center">
                              <span className="relative inline-block">
                                <span className="relative z-10">Nuestro Menú</span>
                                <span className="absolute -bottom-1.5 left-0 w-full h-1.5 sm:h-2 bg-red-500 -rotate-1 transform -skew-x-6 z-0"></span>
                              </span>
                            </h2>
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
        
        {/* Botón flotante de WhatsApp - Oculto en rutas de administración */}
        {!isAdminRoute && (
          <a
            href="https://wa.me/51987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 z-50 animate-pulse hover:animate-none"
            aria-label="Chatear por WhatsApp"
            style={{
              boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.7)',
              animation: 'pulse 2s infinite',
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
      </div>
    </CartProvider>
  );
}

export default App;
