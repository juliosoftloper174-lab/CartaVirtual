<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TerminosSeeder extends Seeder
{
    public function run(): void
    {
        $terminos = "
**Términos de Uso del Servicio**
Al usar nuestra plataforma de pedidos en línea, aceptas cumplir con las siguientes condiciones:
1. El uso del servicio es exclusivo para mayores de 18 años.
2. Los precios y promociones están sujetos a cambios sin previo aviso.
3. Nos reservamos el derecho de rechazar un pedido por razones de disponibilidad de productos.

**Términos de Cupones y Promociones**
Las promociones y cupones de descuento son de uso único y no son acumulables con otras ofertas, salvo que se especifique lo contrario. Los cupones tienen una fecha de vencimiento y no son transferibles.";

        DB::table('terminos')->insert([
            'titulo' => 'Términos y Condiciones',
            'descripcion' => $terminos,
        ]);
    }
}
