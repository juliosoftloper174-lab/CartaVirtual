<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Aquí llamas a todos los seeders que tengas
        $this->call([
            CategoriaSeeder::class,
            ProductoSeeder::class,
            EmpresaSeeder::class,
            CuponSeeder::class,
            PoliticasSeeder::class,
            TerminosSeeder::class,
            // Agrega más seeders aquí si los creas luego
        ]);
    }
}
