import React, { useEffect, useState } from "react";

export default function CategoryTabs({ selected, onSelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Traer categorías desde el controlador PHP
  useEffect(() => {
    fetch(
      "http://localhost/cartavirtualCat/controlador/categoriaControlador.php?action=getAll"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener categorías");
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar las categorías");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;
  if (!categories.length) return <p>No hay categorías disponibles</p>;

  return (
    <div className="w-full p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <div key={cat.id_categoria} className="group">
            <button
              onClick={() => onSelect(cat.nombre)}
              className="w-full h-full flex flex-col items-center focus:outline-none"
            >
              <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 hover:scale-[1.02]">
                <img
                  src={cat.imagen_url || "/images/banner.png"}
                  alt={cat.nombre}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
                <div
                  className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                    selected === cat.nombre
                      ? "border-primary-500 shadow-[0_0_15px_rgba(236,72,153,0.7)]"
                      : "border-white/30 group-hover:border-white/60 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  }`}
                ></div>
              </div>
              <div className="relative px-2 text-center">
                <span
                  className={`relative text-sm sm:text-base font-semibold ${
                    selected === cat.nombre
                      ? "text-primary-600"
                      : "text-gray-800"
                  } group-hover:text-primary-500 transition-colors duration-300`}
                >
                  {cat.nombre}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
