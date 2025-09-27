<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("categoria")->insert([
            'nombre' => 'Hamburguesas',
            'descripcion' => 'Las mejores hamburguesas de la ciudad',
            'imagen_url' => 'images/categorias/hamburguesas.jpg',
            'estado' => 1, // se usa 1 para que esté activo
        ]);

        DB::table('categoria')->insert([
            'nombre' => 'Combos',
            'descripcion' => 'Nuestros combos incluyen hamburguesa, papas y bebida a tu elección',
            'imagen_url' => 'images/categorias/combos.jpg',
            'estado' => 1,
        ]);

        DB::table('categoria')->insert([
            'nombre' => 'Complementos',
            'descripcion' => 'Acompaña tu hamburguesa con papas, aros de cebolla o nuggets',
            'imagen_url' => 'images/categorias/complementos.jpg',
            'estado' => 1,
        ]);

        DB::table('categoria')->insert([
            'nombre' => 'Bebidas',
            'descripcion' => 'Todo tipo de bebidas para refrescarte',
            'imagen_url' => 'images/categorias/bebidas.jpg',
            'estado' => 1,
        ]);

        DB::table('categoria')->insert([
            'nombre' => 'Postres',
            'descripcion' => 'Deliciosos postres para todos los gustos',
            'imagen_url' => 'images/categorias/postres.jpg',
            'estado' => 1,
        ]);
    }
}
