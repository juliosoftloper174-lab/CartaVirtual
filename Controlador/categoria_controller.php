<?php 
require_once 'conexion.php';
require_once 'categoria_class.php';

class CategoriaController {
    public function listar() {
        global $conexion;

        // Creamos una instancia del modelo Categoria
        $categoria = new Categoria($conexion);

        // Obtenemos todas las categorías
        $categorias = $categoria->obtenerCategorias();

        // Incluimos la vista para mostrar las categorías
        // include o require_once ?
    }
}
?>