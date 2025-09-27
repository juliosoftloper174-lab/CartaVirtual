<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PoliticasSeeder extends Seeder
{
    public function run(): void
    {
        $politicas = "
**Política de Devolución**
Aceptamos devoluciones de productos en un plazo de 24 horas si el pedido llega incorrecto o en mal estado. Por favor, contáctanos a través de nuestro teléfono o redes sociales para coordinar la devolución.

**Política de Privacidad**
Tus datos personales son manejados con la máxima confidencialidad. Los usamos exclusivamente para procesar tus pedidos, mejorar nuestro servicio y enviarte promociones si así lo autorizas.

**Política de Entrega**
Nos comprometemos a entregar tu pedido en un tiempo máximo de 45 minutos. En caso de retraso, te compensaremos con un cupón de descuento para tu próxima compra.";

        DB::table('politicas')->insert([
            'titulo' => 'Nuestras Políticas',
            'descripcion' => $politicas,
        ]);
    }
}
