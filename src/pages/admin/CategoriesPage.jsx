import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMenu, FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Hamburguesas', 
      description: 'Deliciosas hamburguesas artesanales con ingredientes frescos',
      image: '/images/images (14).jpeg',
      items: 12
    },
    { 
      id: 2, 
      name: 'Combos', 
      description: 'Combos especiales que incluyen hamburguesa, papas y bebida',
      image: '/images/images (16).jpeg',
      items: 8
    },
    { 
      id: 3, 
      name: 'Bebidas', 
      description: 'Refrescos, jugos naturales y bebidas heladas',
      image: '/images/images (12).jpeg',
      items: 10
    },
    { 
      id: 4, 
      name: 'Acompañamientos', 
      description: 'Papas fritas, aros de cebolla y otros acompañamientos',
      image: '/images/images (11).jpeg',
      items: 6
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({
            ...formData,
            image: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { 
          ...cat, 
          name: formData.name, 
          description: formData.description,
          image: formData.image || cat.image
        } : cat
      ));
    } else {
      // Add new category
      const newCategory = {
        name: formData.name,
        description: formData.description,
        image: formData.image || '/images/placeholder-category.jpg',
        id: Date.now(),
        items: 0
      };
      setCategories([...categories, newCategory]);
    }
    setFormData({ name: '', description: '', image: '' });
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const location = useLocation();

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Gestión de Categorías</h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingCategory(null);
              setFormData({ name: '', description: '', image: '' });
            }}
            className="flex items-center px-6 py-3 bg-black text-white text-base font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            <span className="text-base">Nueva Categoría</span>
          </button>
        </div>

        {/* Modal de Edición/Agregar Categoría */}
        {(showForm || editingCategory) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingCategory(null);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Cerrar</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Imagen de la categoría
                    </label>
                    <div className="mt-1 flex items-center">
                      <div className="w-20 h-20 overflow-hidden rounded-md border border-gray-300 mr-4">
                        <img 
                          src={formData.image || (editingCategory ? editingCategory.image : '/images/placeholder-category.jpg')} 
                          alt="Vista previa"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                        Cambiar imagen
                        <input 
                          type="file" 
                          name="image"
                          accept="image/*"
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingCategory(null);
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {editingCategory ? 'Actualizar' : 'Guardar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border-2 border-gray-800 flex flex-col h-full">
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {category.items} productos
                </div>
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <div className="mb-2">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-1">{category.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{category.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-200">
                      Categoría
                    </span>
                    <span className="text-xs text-gray-500">ID: {category.id}</span>
                  </div>
                  <div className="flex space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEdit(category); }}
                      className="flex-1 flex items-center justify-center py-1.5 px-2 text-xs bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors border border-gray-900"
                    >
                      <FiEdit2 className="mr-1 h-3 w-3" />
                      Editar
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(category.id); }}
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

export default CategoriesPage;
