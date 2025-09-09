<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    // Método para obtener todos los registros de la tabla categoria
    public function index()
    {
        $categoria = Categoria::all();
        return response()->json($categoria);
    }

    // Método para crear una nueva categoria
    public function store(Request $request)
    {
        // Validamos los datos recibidos del request
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:200',
            'imagen_url' => 'nullable|string|max:255',
            'estado' => 'required|boolean',
        ]);

        // Creamos una nueva categoría con los datos del request
        $categoria = Categoria::create($request->all());
        return response()->json($categoria, 201);
    }

    // Método para mostrar una categoría en específico según su id
    public function show($id_categoria)
    {
        // Buscar la categoría por su clave primaria
        $categoria = Categoria::find($id_categoria);

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada.'], 404);
        }

        return response()->json($categoria);
    }

    // Método para actualizar una categoría existente.
    public function update(Request $request, $id_categoria)
    {
        // Encontramos la categoría a actualizar.
        $categoria = Categoria::find($id_categoria);

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        // Validamos los datos recibidos del request
        $request->validate([
            'nombre' => 'sometimes|required|string|max:100',
            'descripcion' => 'nullable|string|max:200',
            'imagen_url' => 'nullable|string|max:255',
            'estado' => 'sometimes|required|boolean',
        ]);

        // Actualizar la categoría con los datos del request
        $categoria->update($request->all());

        return response()->json(['message' => 'Categoría actualizada correctamente.', 'categoria' => $categoria]);
    }

    // Método para eliminar una categoría
    public function destroy($id_categoria)
    {
        // Encontramos la categoría a eliminar
        $categoria = Categoria::find($id_categoria);

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada.'], 404);
        }

        // Eliminamos la categoría
        $categoria->delete();

        return response()->json(['message' => 'Categoría eliminada correctamente.']);
    }
}
