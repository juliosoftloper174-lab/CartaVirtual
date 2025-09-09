<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use App\Models\Categoria;

class ProductoController extends Controller
{
    // Método para obtener todos los productos
    public function index()
    {
        $producto = Producto::all();
        return response()->json($producto);
    }

    // Método para crear un nuevo producto
    public function store(Request $request)
    {
        // Validamos los datos del request
        $request->validate([
            'id_categoria' => 'required|integer|exists:categoria,id_categoria',
            'nombre' => 'required|string|max:100',
            'precio' => 'required|numeric',
            'imagen_url' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:200',
            'estado' => 'required|boolean',
        ]);

        // Creamos un nuevo producto
        $producto = Producto::create($request->all());

        return response()->json($producto, 201);
    }

    // Método para obtener un producto por su id
    public function show($id_producto)
    {
        $producto = Producto::find($id_producto);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado.'],404);
        }

        return response()->json($producto);
    }

    // Método para actualizar un producto
    public function update(Request $request, $id_producto)
    {
        $producto = Producto::find($id_producto);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado.'],404);
        }

        // Validamos los datos
        $request->validate([
            'id_categoria' => 'sometimes|required|integer|exists:categorias,id_categoria',
            'nombre' => 'sometimes|required|string|max:100',
            'precio' => 'sometimes|required|numeric',
            'imagen_url' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:200',
            'estado' => 'sometimes|required|boolean',
        ]);

        $producto->update($request->all());

        return response()->json(['message' => 'Producto actualizado correctamente.', 'producto' => $producto]);
    }

    // Método para eliminar un producto
    public function destroy($id_producto)
    {
        $producto = Producto::find($id_producto);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado.'],404);
        }

        $producto->delete();
        return response()->json(['message' => 'Producto eliminado correctamente.']);
    }

    // Método para obtener todos los productos según su categoría
    public function obtenerPorCategoria($id_categoria) {
        $producto = Producto::where('id_categoria', $id_categoria)->get();

        if ($producto->isEmpty()) {
            return response()->json(['message' => 'No se encontraron productos para esta categoría.'],404);
        }

        return response()->json($producto);
    }
}
