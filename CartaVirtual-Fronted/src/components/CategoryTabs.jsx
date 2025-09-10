import React, { useEffect, useState } from "react";

export default function CategoryTabs({ selected, onSelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categorias")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data); // usamos tal cual viene de la BD
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar categorías:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center py-6">Cargando categorías...</p>;

  return (
    <div className="w-full p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="group relative">
            <button
              onClick={() => onSelect(cat.nombre)}
              className="w-full flex flex-col items-center focus:outline-none"
            >
              <div className="relative w-full aspect-square group">
                {/* Fondo genérico o con imagen */}
                <div
                  className="absolute inset-0 rounded-lg opacity-20"
                  style={{
                    background: "linear-gradient(to bottom right, #ccc, #999)",
                  }}
                ></div>

                <div className="relative w-full h-full overflow-hidden rounded-lg border-2 border-white/80 shadow-lg transition-all duration-500 ease-out group-hover:scale-105">
                  <img
                    src={cat.imagen || "/images/banner.png"}
                    alt={cat.nombre}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 ${
                      selected === cat.nombre
                        ? "bg-black/20"
                        : "bg-black/10 group-hover:bg-black/20"
                    } transition-colors duration-200`}
                  ></div>
                </div>
              </div>
            </button>

            <div className="w-full px-1 mt-2">
              <h3
                className={`text-[15.5px] sm:text-[16.5px] font-sans font-bold text-left w-full tracking-tight ${
                  selected === cat.nombre
                    ? "text-gray-900"
                    : "text-gray-800 group-hover:text-gray-900"
                } transition-all duration-300 leading-tight`}
              >
                {cat.nombre}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
