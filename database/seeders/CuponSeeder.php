<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CuponSeeder extends Seeder
{
    public function run(): void
    {
        // 30% de descuento en el Combo Extrema
        DB::table('cupon')->insert([
            'codigo' => 'SOLOEXTREMA',
            'tipo' => 'porcentaje',
            'valor' => 30.00,
            'id_producto' => 8,
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addMonth(),
            'estado' => 1,
        ]);

        // 50% de descuento en la Hamburguesa Royal
        DB::table('cupon')->insert([
            'codigo' => 'ROYAL50',
            'tipo' => 'porcentaje',
            'valor' => 50.00,
            'id_producto' => 5,
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addMonth(),
            'estado' => 1,
        ]);

        // Compra un Aros de Cebolla y llévate el segundo gratis
        DB::table('cupon')->insert([
            'codigo' => 'AROS2X1',
            'tipo' => 'monto',
            'valor' => 11.90,
            'id_producto' => 21,
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addMonth(),
            'estado' => 1,
        ]);

        // Papas Fritas Medianas gratis en tu compra
        DB::table('cupon')->insert([
            'codigo' => 'PAPASGRATIS',
            'tipo' => 'monto',
            'valor' => 6.90,
            'id_producto' => 19,
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addMonth(),
            'estado' => 1,
        ]);

        // Helado de Vainilla a mitad de precio
        DB::table('cupon')->insert([
            'codigo' => 'HELADOVAINILLA',
            'tipo' => 'porcentaje',
            'valor' => 50.00,
            'id_producto' => 31,
            'fecha_inicio' => Carbon::now(),
            'fecha_fin' => Carbon::now()->addMonths(2),
            'estado' => 1,
        ]);

        // Cupón expirado para pruebas
        DB::table('cupon')->insert([
            'codigo' => 'EXPIRADO2024',
            'tipo' => 'porcentaje',
            'valor' => 15.00,
            'id_producto' => 25,
            'fecha_inicio' => Carbon::create(2024, 1, 1),
            'fecha_fin' => Carbon::create(2024, 1, 31),
            'estado' => 0,
        ]);

        // Cupón inactivo para pruebas
        DB::table('cupon')->insert([
            'codigo' => 'INACTIVO',
            'tipo' => 'porcentaje',
            'valor' => 25.00,
            'id_producto' => 20,
            'fecha_inicio' => Carbon::now()->addDays(5),
            'fecha_fin' => Carbon::now()->addMonth(),
            'estado' => 0,
        ]);
    }
}
