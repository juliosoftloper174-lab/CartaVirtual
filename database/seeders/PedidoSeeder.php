<?php

namespace Database\Seeders;

use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class PedidoSeeder extends Seeder
{
    public function run(): void
    {
        $producto1 = Producto::first();
        $producto2 = Producto::skip(1)->first();

        if ($producto1 && $producto2) {
            $pedido = Pedido::create([
                'nom_cliente' => 'Cliente de Prueba',
                'telef_cliente' => '987654321',
                'direccion_envio' => 'Dirección de Prueba 123',
                'observaciones' => 'Sin observaciones',
                'metodo_pago' => 'Tarjeta',
                'fecha_pedido' => Carbon::now(),
                'estado_pedido' => 1,
            ]);

            $pedido->detalles()->create([
                'id_producto' => $producto1->id_producto,
                'cantidad' => 2,
                'precio_unitario' => $producto1->precio,
            ]);

            $pedido->detalles()->create([
                'id_producto' => $producto2->id_producto,
                'cantidad' => 1,
                'precio_unitario' => $producto2->precio,
            ]);
        }
    }
}
