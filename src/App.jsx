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
    <>
      <CartProvider>
        <div className="flex h-screen overflow-hidden">
          {/* Menú lateral fijo */}
          <div className="w-[17rem] bg-gray-900 text-white fixed left-0 top-0 bottom-0 overflow-hidden">
            <Header className="h-full flex flex-col" />
          </div>
          
          {/* Contenido principal */}
          <main className="flex-1 ml-[17rem] h-screen overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <Routes>
              <Route path="/" element={
                <>
                  {/* Video Section - Tamaño reducido */}
                  <section className="w-full bg-black py-4 md:py-8">
                    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
                      <div className="relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                          src="https://www.youtube.com/embed/bBxl03JzeDY?si=5pLC6m11LxD8P7UF&autoplay=1&mute=1&loop=1&playlist=bBxl03JzeDY&controls=1&showinfo=0&rel=0"
                          title="Bembos - Experiencia única"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </section>

                  {/* Main Content */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Category Navigation */}
                    <section className="mb-16">
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-bold text-primary-500 bg-primary-50 px-3 py-1 rounded-full">
                            Explora
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-primary-100 to-transparent"></div>
                        </div>
                        <div className="mb-2">
                          <h2 className="text-3xl md:text-4xl font-display text-gray-900 uppercase tracking-wider">
                            <span className="relative inline-block">
                              <span className="relative z-10">Nuestras Categorías</span>
                              <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-400 -rotate-1 transform -skew-x-6 z-0"></span>
                            </span>
                          </h2>
                        </div>
                        <p className="text-gray-500 text-lg max-w-2xl mb-8">
                          Descubre nuestra variedad de opciones deliciosas
                        </p>
                      </div>
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-primary-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <CategoryTabs 
                        categories={categories} 
                        selected={selectedCategory} 
                        onSelect={setSelectedCategory} 
                      />
                    </section>

                    {/* Menu Section */}
                    <section className="mt-16">
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                            Especialidades
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-rose-100 to-transparent"></div>
                        </div>
                        <div className="mb-2">
                          <h2 className="text-3xl md:text-4xl font-display text-gray-900 uppercase tracking-wider">
                            <span className="relative inline-block">
                              <span className="relative z-10">Nuestro Menú</span>
                              <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-400 -rotate-1 transform -skew-x-6 z-0"></span>
                            </span>
                          </h2>
                        </div>
                        <p className="text-gray-500 text-lg max-w-2xl mb-8">
                          Descubre nuestra selección de platillos preparados con los mejores ingredientes y mucho sabor.
                        </p>
                      </div>
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-rose-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <MenuSection items={filteredMenu} />
                    </section>
                  </div>
                </>
              } />
              
              <Route path="/carrito" element={
                <CartPage />
              } />
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
              </Route>
              <Route path="/admin/categorias" element={
                <ProtectedRoute>
                  <CategoriesPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          
          {/* Botón flotante de WhatsApp - Oculto en rutas de administración */}
          {!isAdminRoute && (
            <a
              href="https://wa.me/51987654321" // Reemplaza con tu número de WhatsApp
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
              aria-label="Chatear por WhatsApp"
            >
              <FaWhatsapp className="h-10 w-10" />
            </a>
          )}
        </div>
      </CartProvider>
    </>
  );
}

export default App;
