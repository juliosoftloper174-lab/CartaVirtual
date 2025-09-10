// Configuración de la API del backend
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: "/productos", // coincide con Laravel
  CATEGORIES: "/categorias", // coincide con Laravel
  ORDERS: "/pedidos", // coincide con Laravel
  AUTH: "/auth", // si tienes autenticación más adelante
};
