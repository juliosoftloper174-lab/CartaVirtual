<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("producto")->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa Clásica',
            'precio' => 15.50,
            'imagen_url' => 'images/hamburguesa_clasica.jpg',
            'descripcion' => 'La original, con lechuga, tomate y queso',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa BBQ',
            'precio' => 18.00,
            'imagen_url' => 'images/hamburguesa_bbq.jpg',
            'descripcion' => 'Con salsa BBQ, cebolla frita y tocino.',
            'estado' => 1,
        ]);
    }
}
