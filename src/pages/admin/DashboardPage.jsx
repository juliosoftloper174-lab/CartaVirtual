import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiMenu, FiLogOut } from 'react-icons/fi';
import MenuItemForm from '../../components/admin/MenuItemForm';
import { menu as initialMenu } from '../../data/menu';

const DashboardPage = () => {
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Cargar los datos del menú desde el archivo de datos
  const [menu, setMenu] = useState(initialMenu);

  const handleAddItem = (newItem) => {
    setMenu([...menu, { ...newItem, id: Date.now() }]);
    setShowForm(false);
  };

  const handleUpdateItem = (updatedItem) => {
    setMenu(menu.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este ítem?')) {
      setMenu(menu.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">PANEL DE ADMINISTRACIÓN</h1>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FiMenu className="mr-1" /> Ver Tienda
              </Link>
              <button className="flex items-center text-gray-700 hover:text-orange-600">
                <FiLogOut className="mr-1" /> Cerrar Sesión
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="mt-4 flex space-x-4 border-b border-gray-200">
            <Link
              to="/admin"
              className={`px-4 py-2 text-sm font-medium ${
                location.pathname === '/admin'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Hamburguesas
            </Link>
            <Link
              to="/admin/categorias"
              className={`px-4 py-2 text-sm font-medium ${
                location.pathname === '/admin/categorias'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Categorías
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            className="flex items-center px-6 py-3 bg-black text-white text-base font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FiPlus className="mr-2 text-lg" />
            Agregar Nuevo Ítem
          </button>
        </div>

        {/* Modal de Edición/Agregar */}
        {(showForm || editingItem) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingItem ? 'Editar Hamburguesa' : 'Nueva Hamburguesa'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Cerrar</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mt-4">
                  <MenuItemForm 
                    onSubmit={(data) => {
                      if (editingItem) {
                        handleUpdateItem(data);
                      } else {
                        handleAddItem(data);
                      }
                      setShowForm(false);
                    }}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    initialData={editingItem || {}}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid de Tarjetas Compactas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
          {menu.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border-2 border-gray-800 flex flex-col h-full">
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <div className="mb-2">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-200">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold">S/ {item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingItem(item); }}
                      className="flex-1 flex items-center justify-center py-1.5 px-2 text-xs bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors border border-gray-900"
                    >
                      <FiEdit2 className="mr-1 h-3 w-3" />
                      Editar
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                      className="flex-1 flex items-center justify-center py-1.5 px-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors border border-red-700"
                    >
                      <FiTrash2 className="mr-1 h-3 w-3" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
