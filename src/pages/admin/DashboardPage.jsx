import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiMenu, FiLogOut } from 'react-icons/fi';
import MenuItemForm from '../../components/admin/MenuItemForm';

const DashboardPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Mock data - in a real app, this would come from an API
  const [menu, setMenu] = useState([
    {
      id: 1,
      category: 'Hamburguesas',
      name: 'Clásica Peruana',
      description: 'Carne de res, queso andino, lechuga, tomate y salsa de ají amarillo',
      price: 22.50,
      image: '/images/images (14).jpeg'
    },
    {
      id: 2,
      category: 'Hamburguesas',
      name: 'Criolla Deluxe',
      description: 'Doble carne, queso cheddar, cebolla caramelizada, lechuga, tomate y salsa especial de la casa',
      price: 28.90,
      image: '/images/images (10).jpeg'  // Asegúrate de que esta imagen exista en la carpeta public/images
    },
    // Add more mock items as needed
  ]);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center text-gray-700 hover:text-orange-600"
            >
              <FiMenu className="mr-1" /> Ver Tienda
            </Link>
            <button className="flex items-center text-gray-700 hover:text-orange-600">
              <FiLogOut className="mr-1" /> Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Menú de Hamburguesas</h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            Agregar Item
          </button>
        </div>

        {/* Formulario de Edición/Agregar */}
        {(showForm || editingItem) && (
          <div className="mb-8">
            <MenuItemForm 
              onSubmit={editingItem ? handleUpdateItem : handleAddItem}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
              initialData={editingItem || {}}
            />
          </div>
        )}

        {/* Lista de Items */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md
         ">
          <ul className="divide-y divide-gray-200">
            {menu.map((item) => (
              <li key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-800 rounded-full">
                        S/ {item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
