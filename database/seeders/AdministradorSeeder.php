<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdministradorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("administrador")->insert([
            'nombre' => 'Admin',
            'apellido' => 'Principal',
            'email' => 'admin@ejemplo.com',
            'contrasena' => Hash::make('123456'),
        ]);
    }
}
