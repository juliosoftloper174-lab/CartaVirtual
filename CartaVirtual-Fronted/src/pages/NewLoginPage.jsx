import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const NewLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Mostrar mensaje de éxito si viene de registro
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      // Limpiar el estado de navegación para no mostrar el mensaje al recargar
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    // Simulación de autenticación exitosa para desarrollo
    // En producción, esto debería ser reemplazado por una llamada real al backend
    if (formData.usuario === 'admin' && formData.password === '1234') {
      // Simular respuesta exitosa del servidor
      const mockUser = {
        id: 1,
        nombre: 'Administrador',
        email: 'admin@example.com',
        rol: 'admin'
      };
      
      // Guardar en localStorage (en producción, usaríamos un token JWT)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Redirigir al dashboard
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 500);
      return;
    }

    try {
      // Código para la autenticación real con el backend
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          usuario: formData.usuario,
          password: formData.password
        })
      });

      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (jsonError) {
        console.error('Error al parsear la respuesta JSON:', jsonError);
        throw new Error('Error en el formato de la respuesta del servidor');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Error en la autenticación');
      }

      // Guardar token y datos del usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirigir al dashboard o a la ruta previa
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });

    } catch (err) {
      console.error('Error en el login:', err);
      
      // Mensajes de error más amigables
      let errorMessage = 'Error al conectar con el servidor';
      
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
      } else if (err.message.includes('Error en el formato')) {
        errorMessage = 'Error en la respuesta del servidor. Por favor, inténtalo de nuevo.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              name="usuario"
              placeholder="Ingresa tu usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center justify-end">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link 
              to="/registro"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewLoginPage;
