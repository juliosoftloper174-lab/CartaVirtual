<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto; // 👈 Importamos el modelo Producto

class CarritoController extends Controller
{
    // ================== VER CARRITO ==================
    public function index(Request $request)
    {
        try {
            $carrito = $request->session()->get('carrito', []);
            return response()->json([
                'message' => 'Carrito obtenido con éxito',
                'data' => $carrito
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ================== AGREGAR AL CARRITO ==================
    public function store(Request $request)
    {
        try {
            $request->validate([
                'id_producto' => 'required|integer|exists:producto,id_producto',
                'cantidad' => 'required|integer|min:1'
            ]);

            $carrito = $request->session()->get('carrito', []);
            $id_producto = $request->id_producto;

            $producto = Producto::find($id_producto);

            if (!$producto || $producto->estado != 1) {
                return response()->json(['message' => 'Producto no disponible'], 404);
            }

            if (isset($carrito[$id_producto])) {
                $carrito[$id_producto]['cantidad'] += $request->cantidad;
            } else {
                $carrito[$id_producto] = [
                    'id_producto' => $producto->id_producto,
                    'nombre' => $producto->nombre,
                    'precio' => $producto->precio,
                    'cantidad' => $request->cantidad,
                    'imagen_url' => $producto->imagen_url
                ];
            }

            $request->session()->put('carrito', $carrito);

            return response()->json([
                'message' => 'Producto agregado al carrito',
                'data' => $carrito
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al agregar producto al carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ================== ACTUALIZAR CANTIDAD ==================
    public function update(Request $request, $id_producto)
    {
        try {
            $request->validate([
                'cantidad' => 'required|integer|min:1'
            ]);

            $carrito = $request->session()->get('carrito', []);

            if (!isset($carrito[$id_producto])) {
                return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
            }

            $carrito[$id_producto]['cantidad'] = $request->cantidad;
            $request->session()->put('carrito', $carrito);

            return response()->json([
                'message' => 'Cantidad actualizada con éxito',
                'data' => $carrito
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar cantidad',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ================== ELIMINAR PRODUCTO ==================
    public function destroy(Request $request, $id_producto)
    {
        try {
            $carrito = $request->session()->get('carrito', []);

            if (!isset($carrito[$id_producto])) {
                return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
            }

            unset($carrito[$id_producto]);
            $request->session()->put('carrito', $carrito);

            return response()->json([
                'message' => 'Producto eliminado del carrito',
                'data' => $carrito
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ================== VACIAR CARRITO ==================
    public function clear(Request $request)
    {
        try {
            $request->session()->forget('carrito');

            return response()->json(['message' => 'Carrito vaciado con éxito'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al vaciar carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }



// ================== confirmacion de CARRITO en donde se manda el mensaje a ws ==================
    public function confirmarCompra(Request $request)
    {
        try {
            $request->validate([
                'nombre_cliente'  => 'required|string|max:100',
                'telef_cliente'   => 'required|string|max:20',
                'metodo_pago'     => 'required|string|max:50',
                'direccion_envio' => 'required_without:mesa|string|nullable|max:255',
                'mesa'            => 'required_without:direccion_envio|string|nullable|max:10',
                'observaciones'   => 'nullable|string|max:255',
            ]);

            $carrito = $request->session()->get('carrito', []);

            if (empty($carrito)) {
                return response()->json([
                    'status'  => 'error',
                    'message' => 'El carrito está vacío, no se puede confirmar la compra'
                ], 400);
            }

            $pedido = [
                'nombre_cliente'  => $request->nombre_cliente,
                'telef_cliente'   => $request->telef_cliente,
                'direccion_envio' => $request->direccion_envio,
                'mesa'            => $request->mesa,
                'metodo_pago'     => $request->metodo_pago,
                'observaciones'   => $request->observaciones,
                'fecha_pedido'    => now()->toDateTimeString(),
                'productos'       => $carrito,
            ];

            // Construcción del mensaje
            $mensaje  = "🛒 *Nuevo Pedido Confirmado* 🛒\n\n";
            $mensaje .= "*Cliente:* {$pedido['nombre_cliente']}\n";
            $mensaje .= "*Teléfono:* {$pedido['telef_cliente']}\n";
            $mensaje .= "*Método de pago:* {$pedido['metodo_pago']}\n";
            $mensaje .= $pedido['direccion_envio'] 
                ? "*Dirección:* {$pedido['direccion_envio']}\n"
                : "*Mesa:* {$pedido['mesa']}\n";
            if (!empty($pedido['observaciones'])) {
                $mensaje .= "*Observaciones:* {$pedido['observaciones']}\n";
            }
            $mensaje .= "*Fecha:* {$pedido['fecha_pedido']}\n\n";
            $mensaje .= "📦 *Productos:*\n";

            // Calcular total
            $total = 0;
            foreach ($pedido['productos'] as $item) {
                $subtotal = $item['precio'] * $item['cantidad'];
                $total += $subtotal;
                $mensaje .= "- {$item['nombre']} (x{$item['cantidad']}) - S/ " . number_format($subtotal, 2) . "\n";
            }

            $mensaje .= "\n💰 *Total:* S/ " . number_format($total, 2);

            // Número de WhatsApp
            $telefono = "51934629203";
            $url = "https://wa.me/{$telefono}?text=" . urlencode($mensaje);

            // Vaciar carrito
            $request->session()->forget('carrito');

            // 👉 Devolver JSON amigable
            return response()->json([
                'status'       => 'success',
                'message'      => 'Pedido confirmado con éxito',
                'whatsapp_url' => $url,
                'total'        => $total,
                'pedido'       => $pedido
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Error al confirmar compra',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
