import { API_BASE_URL } from '../config/api';

export const apiService = {
  // Método genérico para hacer peticiones
  async request(endpoint, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        // Aquí se puede agregar el token de autenticación si es necesario
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Algo salió mal');
      }

      return responseData;
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error;
    }
  },

  // Ejemplos de métodos específicos
  getProducts: () => apiService.request('/products'),
  getProduct: (id) => apiService.request(`/products/${id}`),
  createOrder: (orderData) => apiService.request('/orders', 'POST', orderData),
  // Agregar más métodos según sea necesario
};

export default apiService;
