<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Producto;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index()
    {
        $pedidos = Pedido::with('detalles.producto')->get();
        return response()->json($pedidos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_cliente' => 'required|string|max:100',
            'telef_cliente' => 'required|string|max:9',
            'direccion_envio' => 'required|string|max:255',
            'observaciones' => 'nullable|string|max:255',
            'metodo_pago' => 'required|string|max:100',
            'productos' => 'required|array|min:1',
            'productos.*.id_producto' => 'required|integer|exists:producto,id_producto',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            $pedido = Pedido::create([
                'nom_cliente' => $request->nom_cliente,
                'telef_cliente' => $request->telef_cliente,
                'direccion_envio' => $request->direccion_envio,
                'observaciones' => $request->observaciones,
                'metodo_pago' => $request->metodo_pago,
                'fecha_pedido' => Carbon::now(),
                'estado_pedido' => 1, // Esto indica que está "Pendiente"
            ]);

            foreach ($request->productos as $item) {
                $producto = Producto::find($item['id_producto']);

                $pedido->detalles()->create([
                    'id_producto' => $producto->id_producto,
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $producto->precio,
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Pedido creado correctamente.', 'pedido' => $pedido], 201);
        
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message'=> 'Error al crear el pedido.', 'error' => $e->getMessage()], 500);
        }
    }

    //
    public function show($id)
    {
        $pedido = Pedido::with('detalles.producto')->find($id);

        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado.'],404);
        }

        return response()->json($pedido);
    }

    public function update(Request $request, $id)
    {
        $pedido = Pedido::find($id);

        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado.'],404);
        }

        $request->validate([
            'estado_pedido' => 'sometimes|required|boolean',
        ]);

        $pedido->update(['estado_pedido' => $request->estado_pedido]);

        return response()->json(['message' => 'Estado del pedido actualizado.', 'pedido' => $pedido]);
    }

    public function destroy($id)
    {
        $pedido = Pedido::find($id);
        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado.'],404);
        }
        $pedido->delete();
        return response()->json(['message' => 'Pedido eliminado correctamente.']);
    }
}
