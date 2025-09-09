<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PoliticasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("politicas")->insert([
            'titulo' => 'Políticas de Privacidad',
            'descripcion' => 'Descripción inicial de las políticas de privacidad de nuestra plataforma.',
        ]);
    }
}
