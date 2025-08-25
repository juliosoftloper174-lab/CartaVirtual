<?php
require_once '../config/conexion.php';
require_once '../Modelo/categoria_class.php';

class CategoriaController {
    private $modelo_categoria;

    public function __construct() {
        global $conexion;
        $this->modelo_categoria = new Categoria($conexion);
    }

    // Método para listar categorías
    public function index() {
        $categorias = $this->modelo_categoria->obtenerCategorias();
        // Cargamos la vista con las categorías
        require_once '../Vista/categorias/index.php';
    }

    // Método para crear una nueva categoría
    public function crear() {
        // Cargamos la vista del formulario de creación
        require_once '../Vista/categorias/crear.php';
    }

    // Método para guardar una nueva categoría
    public function guardar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->modelo_categoria->setNombre($_POST['nombre']);
            $this->modelo_categoria->setDescripcion($_POST['descripcion']);
            $this->modelo_categoria->setImagenUrl($_POST['imagen_url']);
            $this->modelo_categoria->setEstado($_POST['estado']);

            // Llamamos al método crearCategoria del modelo
            if ($this->modelo_categoria->crearCategoria()) {
                header('Location: /categorias?mensaje=exito');
            } else {
                // Manejo de error
                header('Location: /categorias/crear?mensaje=error');
            }
        }
    }

    // Método para editar una categoría
    public function editar($id) {
        $categoria = $this->modelo_categoria->obtenerCategoriaPorId($id);
        // // Incluye la vista que contiene el formulario de edición, pasando los datos obtenidos.
        require_once '../Vista/categorias/editar.php';
    }

    // Método para actualizar una categoría
    public function actualizar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Asigna los valores del formulario (incluyendo el ID) a las propiedades del objeto Categoria.
            $this->modelo_categoria->setIdCategoria($_POST['id_categoria']);
            $this->modelo_categoria->setNombre($_POST['nombre']);
            $this->modelo_categoria->setDescripcion($_POST['descripcion']);
            $this->modelo_categoria->setImagenUrl($_POST['imagen_url']);
            $this->modelo_categoria->setEstado($_POST['estado']);

            // Llamamos al método actualizarCategoria del modelo
            if ($this->modelo_categoria->actualizarCategoria()) {
                header('Location: /categorias?mensaje=exito');
            } else {
                // Manejo de error
                header('Location: /categorias/editar?id=' . $_POST['id_categoria'] . 'mensaje=error');
            }
        }
    }

    // Método para eliminar una categoría
    public function eliminar($id) {
        // Asigna el ID a la propiedad del objeto para que el modelo sepa qué categoría eliminar.
        $this->modelo_categoria->setIdCategoria($id);
        if ($this->modelo_categoria->eliminarCategoria()) {
            header('Location: /categorias?mensaje=exito');
        } else {
            // Manejo de error
            header('Location: /categorias?mensaje=error');
        }
    }
}
?>