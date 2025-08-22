import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-primary-500 mb-4">Burguer Peru</h3>
            <p className="text-gray-400 mb-4">Sabor en cada bocado!</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#menu" className="text-gray-400 hover:text-white transition-colors">Menú</a></li>
              <li><a href="#combos" className="text-gray-400 hover:text-white transition-colors">Combos</a></li>
              <li><a href="#promociones" className="text-gray-400 hover:text-white transition-colors">Promociones</a></li>
              <li><a href="#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary-500" />
                <span className="text-gray-400">Av. Sabores 123, Lima, Perú</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-primary-500" />
                <a href="tel:+51987654321" className="text-gray-400 hover:text-white transition-colors">+51 987 654 321</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary-500" />
                <a href="mailto:hola@burgerperu.com" className="text-gray-400 hover:text-white transition-colors">hola@burgerperu.com</a>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Horario de Atención</h4>
            <div className="flex items-start mb-2">
              <FaClock className="mt-1 mr-3 text-primary-500" />
              <div>
                <p className="text-gray-400">Lunes a Domingo</p>
                <p className="text-gray-400">11:00 AM - 10:00 PM</p>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-medium mb-2 text-white">Métodos de pago</h5>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-800 text-xs px-3 py-1 rounded-full text-gray-300">Visa</span>
                <span className="bg-gray-800 text-xs px-3 py-1 rounded-full text-gray-300">Mastercard</span>
                <span className="bg-gray-800 text-xs px-3 py-1 rounded-full text-gray-300">Yape</span>
                <span className="bg-gray-800 text-xs px-3 py-1 rounded-full text-gray-300">Plin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Burguer Peru. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Términos y condiciones</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Política de privacidad</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Política de cookies</a>
            </div>
          </div>
          <p className="text-center text-gray-600 text-xs mt-4">
            Desarrollado con ❤️ para los amantes de las buenas hamburguesas
          </p>
        </div>
      </div>
    </footer>
  );
}
