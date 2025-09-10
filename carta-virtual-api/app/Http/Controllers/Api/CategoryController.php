<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoryController extends Controller
{
    /**
     * Listar todas las categorías.
     */
    public function index()
    {
        $categorias = Categoria::with('productos')->get();
        return response()->json($categorias);
    }

    /**
     * Crear una nueva categoría.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|string',
            'orden' => 'nullable|integer',
            'activo' => 'nullable|boolean',
        ]);

        $categoria = Categoria::create($validated);
        return response()->json($categoria, 201);
    }

    /**
     * Mostrar una categoría específica.
     */
    public function show(string $id)
    {
        $categoria = Categoria::with('productos')->findOrFail($id);
        return response()->json($categoria);
    }

    /**
     * Actualizar una categoría.
     */
    public function update(Request $request, string $id)
    {
        $categoria = Categoria::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|string',
            'orden' => 'nullable|integer',
            'activo' => 'nullable|boolean',
        ]);

        $categoria->update($validated);
        return response()->json($categoria);
    }

    /**
     * Eliminar una categoría.
     */
    public function destroy(string $id)
    {
        $categoria = Categoria::findOrFail($id);
        $categoria->delete();
        return response()->json(['message' => 'Categoría eliminada correctamente']);
    }
}
