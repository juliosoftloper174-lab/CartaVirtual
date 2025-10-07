<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    // 📋 LISTAR TODOS
    public function index()
    {
        return response()->json(Producto::all(), 200);
    }

    // 🟢 CREAR PRODUCTO
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:200',
            'precio' => 'required|numeric',
            'id_categoria' => 'required|integer',
            'estado' => 'required|boolean',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->descripcion = $request->descripcion;
        $producto->precio = $request->precio;
        $producto->id_categoria = $request->id_categoria;
        $producto->estado = $request->estado;

        if ($request->hasFile('imagen')) {
            $filename = time() . '_' . $request->file('imagen')->getClientOriginalName();
            $request->file('imagen')->move(public_path('images/productos'), $filename);
            $producto->imagen_url = "images/productos/" . $filename;
        }

        $producto->save();

        return response()->json([
            'message' => 'Producto creado con éxito',
            'data' => $producto
        ], 201);
    }

    // 🔍 MOSTRAR UNO
    public function show($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto, 200);
    }

    // ✏️ ACTUALIZAR PRODUCTO
    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $request->validate([
            'nombre' => 'sometimes|required|string|max:100',
            'descripcion' => 'nullable|string|max:200',
            'precio' => 'sometimes|required|numeric',
            'id_categoria' => 'sometimes|required|integer',
            'estado' => 'sometimes|required|boolean',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        // Asignar solo los campos que existen
        if ($request->has('nombre')) $producto->nombre = $request->nombre;
        if ($request->has('descripcion')) $producto->descripcion = $request->descripcion;
        if ($request->has('precio')) $producto->precio = $request->precio;
        if ($request->has('id_categoria')) $producto->id_categoria = $request->id_categoria;
        if ($request->has('estado')) $producto->estado = $request->estado;

        // Manejar imagen si se envió
        if ($request->hasFile('imagen')) {
            // Eliminar imagen anterior si existe
            if ($producto->imagen_url && file_exists(public_path($producto->imagen_url))) {
                unlink(public_path($producto->imagen_url));
            }

            $filename = time() . '_' . $request->file('imagen')->getClientOriginalName();
            $request->file('imagen')->move(public_path('images/productos'), $filename);
            $producto->imagen_url = "images/productos/" . $filename;
        }

        $producto->save();

        return response()->json([
            'message' => 'Producto actualizado con éxito',
            'data' => $producto
        ], 200);
    }

    // ❌ ELIMINAR PRODUCTO
    public function destroy($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        // Eliminar imagen física si existe
        if ($producto->imagen_url && file_exists(public_path($producto->imagen_url))) {
            unlink(public_path($producto->imagen_url));
        }

        $producto->delete();

        return response()->json(['message' => 'Producto eliminado con éxito'], 200);
    }
}
