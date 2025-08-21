<?php
require_once '../config/conexion.php';
require_once './Modelo/producto_class.php';


class ProductoController {
    private $modelo_producto;

    public function __construct() {
        global $conexion;
        $this->modelo_producto = new Producto($conexion);
    }

    // Método para listar productos
    public function index() {
        $productos = $this->modelo_producto->obtenerProductos();
        // Cargamos la vista con los productos
        require_once '';
    }

    // Método para crear un nuevo producto
    public function crear() {
        // Cargamos la vista del formulario de creación
        require_once '';
    }

    // Método para guardar un nuevo producto
    public function guardar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->modelo_producto->setIdCategoria($_POST['id_categoria']);
            $this->modelo_producto->setNombre($_POST['nombre']);
            $this->modelo_producto->setPrecio($_POST['precio']);
            $this->modelo_producto->setImagenUrl($_POST['imagen_url']);
            $this->modelo_producto->setDescripcion($_POST['descripcion']);
            $this->modelo_producto->setEstado($_POST['estado']);

            // Llamamos al método guardar del modelo
            if ($this->modelo_producto->crearProducto()) {
                header('Location: ');
            } else {
                // Manejo de error
                header('Location: ');
            }
        }
    }

    // Método para editar un producto
    public function editar($id) {
        $producto = $this->modelo_producto->obtenerProductoPorId($id);
        // LLamamos a la vista de edición con el producto
        require_once '';
    }

    // Método para actualizar un producto
    public function actualizar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->modelo_producto->setIdProducto($_POST['id_producto']);
            $this->modelo_producto->setIdCategoria($_POST['id_categoria']);
            $this->modelo_producto->setNombre($_POST['nombre']);
            $this->modelo_producto->setPrecio($_POST['precio']);
            $this->modelo_producto->setImagenUrl($_POST['imagen_url']);
            $this->modelo_producto->setDescripcion($_POST['descripcion']);
            $this->modelo_producto->setEstado($_POST['estado']);

            // Llamamos al método actualizar del modelo
            if ($this->modelo_producto->actualizarProducto()) {
                header('Location: ');
            } else {
                // Manejo de error
                header('Location: ');
            }
        }
    }

    // Método para eliminar un producto
    public function eliminar($id) {
        $this->modelo_producto->setIdProducto($id);
        if ($this->modelo_producto->eliminarProducto()) {
            header('Location: ');
        } else {
            // Manejo de error
            header('Location: ');
        }
    }

}
?>