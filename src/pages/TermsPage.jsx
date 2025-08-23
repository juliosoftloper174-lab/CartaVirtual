import React from 'react';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Términos y Condiciones</h1>
        <p className="text-lg text-gray-600">Última actualización: 22 de Agosto, 2024</p>
      </div>
      
      <div className="prose prose-red prose-lg max-w-none">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
        <p className="mb-6 text-gray-700">
          Al acceder y utilizar nuestro menú digital, usted acepta cumplir con estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, por favor no utilice nuestro servicio.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Uso del Menú Digital</h2>
        <p className="mb-6 text-gray-700">
          Nuestro menú digital está diseñado para facilitar su experiencia de pedido. Los precios y la disponibilidad están sujetos a cambios sin previo aviso. Nos esforzamos por mantener la información actualizada, pero no garantizamos la exactitud en todo momento.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Pedidos</h2>
        <p className="mb-6 text-gray-700">
          Los pedidos realizados a través de WhatsApp están sujetos a disponibilidad. Nos reservamos el derecho de rechazar o cancelar pedidos en cualquier momento por razones que incluyen, entre otras, disponibilidad de productos, errores en la información del producto o problemas detectados en su cuenta.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Precios y Pagos</h2>
        <p className="mb-6 text-gray-700">
          Los precios mostrados en el menú están en soles peruanos (S/) e incluyen IGV. Los precios pueden variar según la ubicación del envío. Se aplicarán cargos adicionales por entrega según la zona.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Política de Privacidad</h2>
        <p className="mb-6 text-gray-700">
          Respetamos su privacidad. La información personal que nos proporcione solo se utilizará para procesar su pedido y mejorar su experiencia. No compartiremos su información con terceros sin su consentimiento.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contacto</h2>
        <p className="mb-6 text-gray-700">
          Para cualquier consulta sobre estos términos, contáctenos a través de nuestro número de WhatsApp o visite nuestro local en Av. Principal 123, Lima, Perú.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
