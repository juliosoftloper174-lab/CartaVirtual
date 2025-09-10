<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pedido;
use App\Models\PedidoDetalle;

class PedidoController extends Controller
{
    /**
     * Listar todos los pedidos.
     */
    public function index()
    {
        $pedidos = Pedido::with('usuario', 'detalles')->get();
        return response()->json($pedidos);
    }

    /**
     * Crear un nuevo pedido.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:usuarios,id',
            'total' => 'required|numeric',
            'detalles' => 'required|array',
            'detalles.*.producto_id' => 'required|exists:productos,id',
            'detalles.*.cantidad' => 'required|integer|min:1',
            'detalles.*.precio_unitario' => 'required|numeric',
        ]);

        $pedido = Pedido::create([
            'user_id' => $validated['user_id'],
            'total' => $validated['total'],
            'estado' => 'Creado', // estado inicial
        ]);

        foreach ($validated['detalles'] as $detalle) {
            PedidoDetalle::create([
                'pedido_id' => $pedido->id,
                'producto_id' => $detalle['producto_id'],
                'cantidad' => $detalle['cantidad'],
                'precio_unitario' => $detalle['precio_unitario'],
                'subtotal' => $detalle['cantidad'] * $detalle['precio_unitario'],
            ]);
        }

        return response()->json($pedido->load('detalles'), 201);
    }

    /**
     * Mostrar un pedido específico.
     */
    public function show(string $id)
    {
        $pedido = Pedido::with('usuario', 'detalles')->findOrFail($id);
        return response()->json($pedido);
    }

    /**
     * Actualizar un pedido.
     */
    public function update(Request $request, string $id)
    {
        $pedido = Pedido::findOrFail($id);

        $validated = $request->validate([
            'estado' => 'sometimes|required|string',
        ]);

        $pedido->update($validated);
        return response()->json($pedido);
    }

    /**
     * Eliminar un pedido.
     */
    public function destroy(string $id)
    {
        $pedido = Pedido::findOrFail($id);
        $pedido->delete();
        return response()->json(['message' => 'Pedido eliminado correctamente']);
    }
}
