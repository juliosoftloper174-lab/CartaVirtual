import React, { useState } from "react";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    logo: "",
    direccion: "Av. Principal 123, Lima, Perú",
    telefono: "+51 987 654 321",
    horarioSemana: "Lun - Vie: 12:00 PM - 10:00 PM",
    horarioFin: "Sáb - Dom: 1:00 PM - 11:00 PM",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos guardados:", formData);
    // Aquí deberías hacer una petición POST/PUT a tu backend
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow border border-black">
      <h2 className="text-xl font-bold mb-4">Configuración del Local</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Logo */}
        <div>
          <label className="block font-medium">Logo</label>
          <input
            type="file"
            name="logo"
            className="border p-2 w-full"
            onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })}
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="block font-medium">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block font-medium">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Horarios */}
        <div>
          <label className="block font-medium">Horario (Semana)</label>
          <input
            type="text"
            name="horarioSemana"
            value={formData.horarioSemana}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Horario (Fin de Semana)</label>
          <input
            type="text"
            name="horarioFin"
            value={formData.horarioFin}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
