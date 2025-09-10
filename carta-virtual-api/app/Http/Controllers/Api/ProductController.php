<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todos los productos con su categoría
        $productos = Producto::with('categoria')->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'nombre' => $p->nombre,
                'descripcion' => $p->descripcion,
                'precio' => $p->precio,
                'imagen' => $p->imagen,
                'categoria_id' => $p->categoria_id,
                'categoria_nombre' => $p->categoria ? $p->categoria->nombre : null,
            ];
        });

        return response()->json($productos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // No implementado por ahora
        return response()->json(['message' => 'Función no implementada'], 501);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $producto = Producto::with('categoria')->find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json([
            'id' => $producto->id,
            'nombre' => $producto->nombre,
            'descripcion' => $producto->descripcion,
            'precio' => $producto->precio,
            'imagen' => $producto->imagen,
            'categoria_id' => $producto->categoria_id,
            'categoria_nombre' => $producto->categoria ? $producto->categoria->nombre : null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return response()->json(['message' => 'Función no implementada'], 501);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return response()->json(['message' => 'Función no implementada'], 501);
    }
}
