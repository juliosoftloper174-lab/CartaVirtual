<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoriaController extends Controller
{
    // ================== LISTAR TODAS ==================
    public function index()
    {
        return response()->json(Categoria::all(), 200);
    }

    // ================== CREAR ==================
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'required|boolean',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $categoria = new Categoria();
        $categoria->nombre = $request->nombre;
        $categoria->descripcion = $request->descripcion;
        $categoria->estado = $request->estado;

        // Guardar imagen en storage/app/public/categorias
        if ($request->hasFile('imagen')) {
            $filename = time() . '_' . $request->file('imagen')->getClientOriginalName();
            $path = $request->file('imagen')->storeAs('categorias', $filename, 'public');

            // Guardar solo la ruta relativa en la BD
            $categoria->imagen_url = $path; // ejemplo: categorias/1757943396_ceviche.jpg
        }

        $categoria->save();

        return response()->json([
            'message' => 'Categoría creada con éxito',
            'data' => $categoria
        ], 201);
    }

    // ================== MOSTRAR UNA ==================
    public function show($id_categoria)
    {
        $categoria = Categoria::find($id_categoria);

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        return response()->json($categoria, 200);
    }

    // ================== ACTUALIZAR ==================
    public function update(Request $request, $id_categoria)
    {
        $categoria = Categoria::find($id_categoria);

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'estado' => 'sometimes|required|boolean',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->filled('nombre')) $categoria->nombre = $request->nombre;
        if ($request->filled('descripcion')) $categoria->descripcion = $request->descripcion;
        if ($request->has('estado')) $categoria->estado = $request->estado;

        // Subir nueva imagen si existe
        if ($request->hasFile('imagen')) {
            // Eliminar imagen anterior si existe
            if ($categoria->imagen_url && Storage::disk('public')->exists($categoria->imagen_url)) {
                Storage::disk('public')->delete($categoria->imagen_url);
            }

            $filename = time() . '_' . $request->file('imagen')->getClientOriginalName();
            $path = $request->file('imagen')->storeAs('categorias', $filename, 'public');
            $categoria->imagen_url = $path;
        }

        $categoria->save();

        return response()->json([
            'message' => 'Categoría actualizada con éxito',
            'data' => $categoria
        ], 200);
    }

    // ================== ELIMINAR ==================
    public function destroy($id_categoria)
    {
        $categoria = Categoria::find($id_categoria);

        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        // Eliminar imagen asociada si existe
        if ($categoria->imagen_url && Storage::disk('public')->exists($categoria->imagen_url)) {
            Storage::disk('public')->delete($categoria->imagen_url);
        }

        $categoria->delete();

        return response()->json(['message' => 'Categoría eliminada con éxito'], 200);
    }
}
