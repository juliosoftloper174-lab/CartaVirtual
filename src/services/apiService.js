import { API_BASE_URL, API_ENDPOINTS } from "../config/api";

export const apiService = {
  async request(endpoint, method = "GET", data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (data) options.body = JSON.stringify(data);

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.message || "Algo salió mal");
      return responseData;
    } catch (error) {
      console.error("Error en la petición:", error);
      throw error;
    }
  },

  // Productos
  getProducts: () => apiService.request(API_ENDPOINTS.PRODUCTS),
  getProduct: (id) => apiService.request(`${API_ENDPOINTS.PRODUCTS}/${id}`),

  // Categorías
  getCategories: () => apiService.request(API_ENDPOINTS.CATEGORIES),

  // Pedidos
  createOrder: (orderData) =>
    apiService.request(API_ENDPOINTS.ORDERS, "POST", orderData),
};

export default apiService;
