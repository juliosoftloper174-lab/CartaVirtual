// React & Router
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Routes, Route, useLocation } from "react-router-dom";
import SplitText from "./resources/SplitText";


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

// Componente de ruta protegida (temporalmente desactivada para pruebas)
const ProtectedRoute = ({ children }) => children;

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // ------------------------------
  // Estados para productos desde API
  // ------------------------------
  const [products, setProducts] = useState([]); // Productos traídos de la API
  const [loadingProducts, setLoadingProducts] = useState(true); // Para mostrar "cargando"

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // ------------------------------
  // useEffect para traer productos
  // ------------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/productos")
      .then((res) => res.json())
      .then((data) => {
        const mappedProducts = data.map((p) => ({
          id: p.id,
          name: p.nombre,
          description: p.descripcion,
          price: p.precio,
          image: p.imagen,
          categoria_nombre: p.categoria?.nombre || "Sin categoría",
        }));
        setProducts(mappedProducts);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoadingProducts(false);
      });
  }, []);

  // ------------------------------
  // Filtrado por categoría
  // ------------------------------
  const categories = [
    "Todos",
    ...new Set(products.map((p) => p.categoria_nombre)),
  ];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.categoria_nombre === selectedCategory);

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <CartProvider>
      <div
        className="flex flex-col h-screen overflow-hidden relative"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Header fijo */}
        <div className="w-full bg-black text-white fixed top-0 left-0 z-50">
          <Header className="w-full" />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full">
            {location.pathname === "/" && (
              <>
                {/* Video y sección especial */}
                <div
                  className="relative w-full bg-black overflow-hidden flex items-center justify-center"
                  style={{ height: "70vh", minHeight: "500px" }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/images/hamburguesa.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                  <div className="relative z-10 text-center px-4">
  <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
    <SplitText
      text="prueba123445"
      tag="h1"
      className="block"
      splitType="chars"   // letras una por una
      delay={80}          // 80ms entre letras
    />
  </div>

  <p className="text-xl md:text-2xl text-white font-medium bg-black bg-opacity-50 inline-block px-6 py-2 rounded-full">
    ¡Sabor que enamora en cada bocado!
  </p>
</div>
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                </div>

                {/* Barra de acción */}
                <ActionBar />
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
                        {/* Categorías */}
                        <div className="px-4 sm:px-6 text-center">
                          <CategoryTabs
                            categories={categories}
                            selected={selectedCategory}
                            onSelect={setSelectedCategory}
                          />
                        </div>

                        {/* Menú */}
                        <div className="px-4 sm:px-6 text-center">
                          {loadingProducts ? (
                            <p>Cargando productos...</p>
                          ) : (
                            <MenuSection items={filteredProducts} />
                          )}
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

        {/* Botón flotante WhatsApp */}
        {!isAdminRoute && (
          <a
            href="https://wa.me/51987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-green-500 text-white rounded-full shadow-lg z-50 animate-pulse p-3 md:p-4"
          >
            <FaWhatsapp className="h-10 w-10" />
          </a>
        )}

        {/* Barra móvil */}
        <MobileMenu />
      </div>
    </CartProvider>
  );
}

export default App;
