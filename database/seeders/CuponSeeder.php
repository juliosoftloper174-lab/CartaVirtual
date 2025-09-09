<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CuponSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("cupon")->insert([
            'codigo' => 'DESCUENTO10',
            'descripcion' => '10% de descuento en tu compra',
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addDays(30),
            'estado' => 1,
        ]);
    }
}
