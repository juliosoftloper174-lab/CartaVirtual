<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    // LISTAR TODOS
    public function index()
    {
        return response()->json(Producto::all(), 200);
    }

    // CREAR PRODUCTO
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
            $path = $request->file('imagen')->storeAs('productos', $filename, 'public');
            $producto->imagen_url = $path; // se guarda: productos/archivo.jpg
        }

        $producto->save();

        return response()->json([
            'message' => 'Producto creado con éxito',
            'data' => $producto
        ], 201);
    }

    // MOSTRAR UNO
    public function show($id)
    {
        $producto = Producto::find($id);
        if (!$producto) return response()->json(['message' => 'Producto no encontrado'], 404);
        return response()->json($producto, 200);
    }

    // ACTUALIZAR
    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);
        if (!$producto) return response()->json(['message' => 'Producto no encontrado'], 404);

        $request->validate([
            'nombre' => 'sometimes|required|string|max:100',
            'descripcion' => 'nullable|string|max:200',
            'precio' => 'sometimes|required|numeric',
            'id_categoria' => 'sometimes|required|integer',
            'estado' => 'sometimes|required|boolean',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->filled('nombre')) $producto->nombre = $request->nombre;
        if ($request->filled('descripcion')) $producto->descripcion = $request->descripcion;
        if ($request->filled('precio')) $producto->precio = $request->precio;
        if ($request->filled('id_categoria')) $producto->id_categoria = $request->id_categoria;
        if ($request->has('estado')) $producto->estado = $request->estado;

        if ($request->hasFile('imagen')) {
            if ($producto->imagen_url && Storage::disk('public')->exists($producto->imagen_url)) {
                Storage::disk('public')->delete($producto->imagen_url);
            }
            $filename = time() . '_' . $request->file('imagen')->getClientOriginalName();
            $path = $request->file('imagen')->storeAs('productos', $filename, 'public');
            $producto->imagen_url = $path;
        }

        $producto->save();

        return response()->json([
            'message' => 'Producto actualizado con éxito',
            'data' => $producto
        ], 200);
    }

    // ELIMINAR
    public function destroy($id)
    {
        $producto = Producto::find($id);
        if (!$producto) return response()->json(['message' => 'Producto no encontrado'], 404);

        if ($producto->imagen_url && Storage::disk('public')->exists($producto->imagen_url)) {
            Storage::disk('public')->delete($producto->imagen_url);
        }

        $producto->delete();
        return response()->json(['message' => 'Producto eliminado con éxito'], 200);
    }
}
