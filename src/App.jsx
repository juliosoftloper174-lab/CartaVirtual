import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryTabs from "./components/CategoryTabs";
import MenuSection from "./components/MenuSection";
import CartPage from "./pages/CartPage";
import NewLoginPage from "./pages/NewLoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/admin/DashboardPage";
import { menu } from "./data/menu";

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const categories = ["Todos", ...new Set(menu.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredMenu = selectedCategory === "Todos"
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  return (
    <>
      <CartProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Header className="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm" />
          
          <Routes>
            <Route path="/" element={
              <>
                {/* Hero Section */}
                <section className="w-full bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ height: '380px' }}>
                      <img 
                        src="/images/banner.png" 
                        alt="Banner promocional" 
                        className="absolute left-0 w-full h-full object-cover"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center 40%',
                          imageRendering: 'auto',
                          top: '-5%',
                          height: '110%'
                        }}
                      />
                    </div>
                  </div>
                </section>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  {/* Category Navigation */}
                  <section className="mb-16">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Nuestras Categorías</h2>
                      <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
                    </div>
                    <CategoryTabs 
                      categories={categories} 
                      selected={selectedCategory} 
                      onSelect={setSelectedCategory} 
                    />
                  </section>

                  {/* Menu Section */}
                  <section>
                    <div className="text-center mb-10">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Nuestro Menú</h2>
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        Descubre nuestra selección de platillos preparados con los mejores ingredientes y mucho sabor.
                      </p>
                      <div className="w-20 h-1 bg-primary-500 mx-auto mt-4 rounded-full"></div>
                    </div>
                    <MenuSection items={filteredMenu} />
                  </section>
                </main>
                <Footer />
              </>
            } />
            
            <Route path="/carrito" element={
              <>
                <CartPage />
                <Footer />
              </>
            } />
            <Route path="/login" element={<NewLoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </CartProvider>
    </>
  );
}

export default App;
