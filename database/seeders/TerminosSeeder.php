<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TerminosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("terminos")->insert([
            'titulo' => 'Términos y Condiciones',
            'descripcion' => 'Descripción inicial de los términos y condiciones de nuestra plataforma.',
        ]);
    }
}
