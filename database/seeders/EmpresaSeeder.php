<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class EmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('empresa')->insert([
            'nombre' => 'Bembos',
            'telefono' => '987654321',
            'ubicacion' => 'Lima, Perú',
            'horario' => '12:00 PM - 11:00 PM',
            'tiktok_url' => 'https://www.tiktok.com/@bembos.oficial',
            'facebook_url' => 'https://www.facebook.com/bembos',
            'instagram_url' => 'https://www.instagram.com/bembosoficial/',
            'video_pres_url' => 'https://www.youtube.com/watch?v=bBxl03JzeDY',
            'logo_url' => 'images/bembos-logo.png',
            'portada_url' => 'images/bembos-portada.jpg',
        ]);
    }
}
