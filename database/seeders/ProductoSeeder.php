<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        // Productos de la categoría "Hamburguesas"

        DB::table("producto")->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa Clásica',
            'precio' => 17.90,
            'imagen_url' => 'images/productos/hamburguesa_clasica.jpg',
            'descripcion' => 'Hamburguesa a la parrilla, lechuga, tomate y mayonesa.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa A lo Pobre',
            'precio' => 21.90,
            'imagen_url' => 'images/productos/hamburguesa_alopobre.jpg',
            'descripcion' => 'Hamburguesa a la parrilla, huevo frito, plátano frito, cebolla blanca, tomate y mayonesa.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa Parrillera',
            'precio' => 23.90,
            'imagen_url' => 'images/productos/hamburguesa_parrillerra.jpg',
            'descripcion' => 'Hamburguesa a la parrilla, chorizo a la parrilla, chimichurri, tomate, mayonesa y mostaza.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa La Carretillera',
            'precio' => 23.90,
            'imagen_url' => 'images/productos/hamburguesa_lacarretillera.jpg',
            'descripcion' => 'Deliciosa hamburguesa de carne a la parrilla con pollo deshilachado, salsa tártara y papitas al hilo.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa Royal',
            'precio' => 20.90,
            'imagen_url' => 'images/productos/hamburguesa_royal.jpg',
            'descripcion' => 'Bembos a la parrilla, huevo, queso Edam, tomate, lechuga y mayonesa.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa Cheese',
            'precio' => 19.90,
            'imagen_url' => 'images/productos/hamburguesa_cheese.jpg',
            'descripcion' => 'Hamburguesa a la parrilla, lechuga, tomate, mayonesa y queso.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa Hawaiana',
            'precio' => 21.90,
            'imagen_url' => 'images/productos/hamburguesa_hawaiana.jpg',
            'descripcion' => 'Hamburguesa a la parrilla, queso, jamón inglés, piña en almíbar y mayonesa.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 1,
            'nombre' => 'Hamburguesa Extrema',
            'precio' => 25.90,
            'imagen_url' => 'images/productos/hamburguesa_extrema.jpg',
            'descripcion' => 'Hamburguesa doble a la parrilla con queso edam, tocino, tomate, lechuga y mayonesa.',
            'estado' => 1,
        ]);

        // Productos de la categoría "Combos"

        DB::table('producto')->insert([
            'id_categoria' => 2,
            'nombre' => 'Combo Clásico',
            'precio' => 24.80,
            'imagen_url' => 'images/productos/combo_clasico.jpg',
            'descripcion' => 'Hamburguesa Clásica a la parrilla: Hamburguesa a la parrilla, lechuga, tomate y mayonesa. Papa mediana y gaseosa personal de 500ml.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 2,
            'nombre' => 'Combo Extrema',
            'precio' => 32.80,
            'imagen_url' => 'images/productos/combo_extremo.jpg',
            'descripcion' => 'Hamburguesa Extrema a la parrilla: Hamburguesa doble a la parrilla con queso edam, tocino, tomate, lechuga y mayonesa. Papa mediana y gaseosa personal de 500ml.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 2,
            'nombre' => 'Combo Parrillera',
            'precio' => 30.80,
            'imagen_url' => 'images/productos/combo_parrillera.jpg',
            'descripcion' => 'Hamburguesa parrillera a la parrilla: Hamburguesa y chorizo a la parrilla, chimichurrri, tomate, mayonesa y mostaza. Papa mediana y gaseosa personal de 500ml.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 2,
            'nombre' => 'Combo A lo Pobre',
            'precio' => 28.80,
            'imagen_url' => 'images/productos/combo_alopobre.jpg',
            'descripcion' => 'Hamburguesa A lo Pobre a la parrilla: Hamburguesa a la parrilla, huevo frito, plátano frito, cebolla blanca, tomate y mayonesa. Papa mediana y gaseosa personal de 500ml.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 2,
            'nombre' => 'Combo Royal',
            'precio' => 27.80,
            'imagen_url' => 'images/productos/combo_royal.jpg',
            'descripcion' => 'Hamburguesa Royal a la parrilla: Hamburguesa a la parrilla, huevo, queso Edam, tomate, lechuga y mayonesa. Papa mediana y gaseosa personal de 500ml.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 2,
            'nombre' => 'Combo Cheese',
            'precio' => 26.80,
            'imagen_url' => 'images/productos/combo_cheese.jpg',
            'descripcion' => 'Hamburguesa Cheese a la parrilla: Hamburguesa a la parrilla, lechuga, tomate, mayonesa y queso. Papa mediana y gaseosa personal de 500ml.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 2,
            'nombre' => 'Combo Hawaiana',
            'precio' => 28.80,
            'imagen_url' => 'images/productos/combo_hawaiana.jpg',
            'descripcion' => 'Hamburguesa a la parrilla, queso, jamón inglés, piña en almíbar y mayonesa. Papa mediana y gaseosa personal de 500ml.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 2,
            'nombre' => 'Combo Carretillera',
            'precio' => 30.80,
            'imagen_url' => 'images/productos/combo_lacarretillera.jpg',
            'descripcion' => 'Hamburguesa Carretillera a la parrilla: Hamburguesa a la parrilla, pollo deshilachado, salsa tártara, papas al hilo, tomate y lechuga. Papa mediana y gaseosa personal de 500ml.',
            'estado' => 1,
        ]);

        // Productos de la categoría "Complementos"

        DB::table('producto')->insert([
            'id_categoria' => 3,
            'nombre' => 'Cheese Fingers (6 piezas)',
            'precio' => 13.90,
            'imagen_url' => 'images/productos/complemento_cheesefingers.jpg',
            'descripcion' => '¡Prueba nuestros deliciosos Cheese  Fingers! Crujientes por fuera y con un interior de queso fundido que te encantará.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 3,
            'nombre' => 'Nuggets de Pollo (6 piezas)',
            'precio' => 12.90,
            'imagen_url' => 'images/productos/complemento_nuggets.jpg',
            'descripcion' => '¡Prueba nuestros deliciosos Nuggets de Pollo! Crujientes por fuera y jugosos por dentro, perfectos para cualquier ocasión.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 3,
            'nombre' => 'Papas Fritas Medianas',
            'precio' => 6.90,
            'imagen_url' => 'images/productos/complemento_papasfritas.jpg',
            'descripcion' => '¡Prueba nuestras crujientes Papas Fritas Medianas! Perfectas para acompañar tu hamburguesa favorita o disfrutar como snack.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 3,
            'nombre' => 'Salchipapa',
            'precio' => 10.90,
            'imagen_url' => 'images/productos/complemento_salchipapa.jpg',
            'descripcion' => '¡Porción familiar de papas fritas con Hot Dog',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 3,
            'nombre' => 'Aros de Cebolla (6 piezas)',
            'precio' => 11.90,
            'imagen_url' => 'images/productos/complemento_arosdecebolla.jpg',
            'descripcion' => '¡Disfruta de nuestros crujientes Aros de Cebolla! Perfectos como acompañamiento o snack, con un sabor irresistible.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 3,
            'nombre' => 'Nuggetspapa',
            'precio' => 15.90,
            'imagen_url' => 'images/productos/complemento_nuggetspapa.jpg',
            'descripcion' => '¡Porción familiar de papas fritas con Nuggets de Pollo x5',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 3,
            'nombre' => 'Salchinuggets',
            'precio' => 17.90,
            'imagen_url' => 'images/productos/complemento_salchinuggets.jpg',
            'descripcion' => '¡Porción familiar de papas fritas con Hot dog y Nuggets de Pollo x4',
            'estado' => 1,
        ]);

        // Productos de la categoría "Bebidas"

        DB::table('producto')->insert([
            'id_categoria' => 4,
            'nombre' => 'Coca Cola Sabor Original (500ml)',
            'precio' => 5.90,
            'imagen_url' => 'images/productos/bebida_cocacola1.jpg', // Normal
            'descripcion' => 'Acompaña tu comida con una refrescante Coca Cola de 500ml. ¡El sabor original que todos aman!',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 4,
            'nombre' => 'Coca Cola Sin Azúcar (500ml)',
            'precio' => 5.90,
            'imagen_url' => 'images/productos/bebida_cocacola2.jpg', // Sin azúcar
            'descripcion' => 'Disfruta del sabor de Coca Cola sin azúcar en una botella de 500ml. ¡La opción perfecta para cuidar tu salud!',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 4,
            'nombre' => 'Inca Kola Sabor Original (500ml)',
            'precio' => 5.90,
            'imagen_url' => 'images/productos/bebida_incakola1.jpg', // Normal
            'descripcion' => 'Acompaña tu comida con una refrescante Inca Kola de 500ml. ¡El sabor original que todos aman!',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 4,
            'nombre' => 'Inca Kola Sin Azúcar (500ml)',
            'precio' => 5.90,
            'imagen_url' => 'images/productos/bebida_incakola2.jpg', // Sin azúcar
            'descripcion' => 'Disfruta del sabor de Inca Kola sin azúcar en una botella de 500ml. ¡La opción perfecta para cuidar tu salud!',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 4,
            'nombre' => 'Fanta (500ml)',
            'precio' => 5.90,
            'imagen_url' => 'images/productos/bebida_fanta.jpg',
            'descripcion' => 'Disfruta del sabor afrutado y refrescante de Fanta en una botella de 500ml. ¡Perfecta para cualquier ocasión!',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 4,
            'nombre' => 'Sprite (500ml)',
            'precio' => 5.90,
            'imagen_url' => 'images/productos/bebida_sprite.jpg',
            'descripcion' => 'Disfruta del sabor refrescante y cítrico de Sprite en una botella de 500ml. ¡Perfecta para cualquier ocasión!',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 4,
            'nombre' => 'Agua San Luis sin gas (625ml)',
            'precio' => 4.90,
            'imagen_url' => 'images/productos/bebida_agua.jpg',
            'descripcion' => 'Mantente hidratado con nuestra agua mineral de 500ml. ¡La opción saludable y refrescante!',
            'estado' => 1,
        ]);

        // Productos de la categoría "Postres"

        DB::table('producto')->insert([
            'id_categoria' => 5,
            'nombre' => 'Helado de Vainilla (1 bola)',
            'precio' => 6.90,
            'imagen_url' => 'images/productos/postre_heladovainilla.jpg',
            'descripcion' => 'Disfruta de una deliciosa bola de helado de vainilla, perfecta para refrescarte y endulzar tu día.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 5,
            'nombre' => 'Helado de Chocolate (1 bola)',
            'precio' => 6.90,
            'imagen_url' => 'images/productos/postre_heladochocolate.jpg',
            'descripcion' => 'Disfruta de una deliciosa bola de helado de chocolate, perfecta para los amantes del sabor intenso y dulce.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 5,
            'nombre' => 'Helado de Fresa (1 bola)',
            'precio' => 6.90,
            'imagen_url' => 'images/productos/postre_heladofresa.jpg',
            'descripcion' => 'Disfruta de una deliciosa bola de helado de fresa, perfecta para los amantes del sabor afrutado y refrescante.',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 5,
            'nombre' => 'Helado de chocolate con vainilla (1 bola)',
            'precio' => 7.90,
            'imagen_url' => 'images/productos/postre_heladochocovainilla.jpg',
            'descripcion' => 'Disfruta de una deliciosa bola de helado que combina el sabor intenso del chocolate con la suavidad de la vainilla. ¡Una combinación perfecta para los amantes del helado!',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 5,
            'nombre' => 'Helado de chocolate con fresa (1 bola)',
            'precio' => 7.90,
            'imagen_url' => 'images/productos/postre_heladochocofresa.jpg',
            'descripcion' => 'Disfruta de una deliciosa bola de helado que combina el sabor intenso del chocolate con la frescura de la fresa. ¡Una combinación perfecta para los amantes del helado!',
            'estado' => 1,
        ]);

        DB::table('producto')->insert([
            'id_categoria' => 5,
            'nombre' => 'Brownie con Helado de Vainilla',
            'precio' => 12.90,
            'imagen_url' => 'images/productos/postre_browniehelado.jpg',
            'descripcion' => 'Disfruta de un delicioso brownie de chocolate caliente acompañado de una refrescante bola de helado de vainilla. ¡El postre perfecto para los amantes del chocolate!',
            'estado' => 1,
        ]);
    }
}
