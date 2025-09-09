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
            'imagen_url' => 'images/hamburguesas_categoria.jpg',
            'estado' => 1, // se usa 1 para que esté activo
        ]);

        DB::table('categoria')->insert([
            'nombre' => 'Bebidas',
            'descripcion' => 'Refrescos, jugos y más',
            'imagen_url' => 'images/bebidas_categoria.jpg',
            'estado' => 1,
        ]);

        DB::table('categoria')->insert([
            'nombre' => 'Postres',
            'descripcion' => 'Deliciosos postres para todos los gustos',
            'imagen_url' => 'images/postres_categoria.jpg',
            'estado' => 1,
        ]);
    }
}
