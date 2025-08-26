// Configuración de la API del backend
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  ORDERS: '/orders',
  AUTH: '/auth',
  // Agregar más endpoints según sea necesario
};
