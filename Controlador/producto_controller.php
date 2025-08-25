<?php
require_once '../config/conexion.php';
require_once '../Modelo/producto_class.php';

class ProductoController {
    private $modelo_producto;

    public function __construct() {
        global $conexion;
        $this->modelo_producto = new Producto($conexion);
    }

    // Muestra la lista de todos los productos (Panel de Admin)
    public function index() {
        $productos = $this->modelo_producto->obtenerProductos();
        // Cargamos la vista que muestra la lista de productos en el panel de administración
        require_once '../Vista/productos/index.php';
    }

    // Muestra el formulario para crear un nuevo producto
    public function crear() {
        // Cargamos la vista del formulario de creación
        require_once '../Vista/productos/crear.php';
    }

    // Método para guardar un nuevo producto
    public function guardar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Asignamos los datos del formulario a las propiedades del objeto Producto.
            $this->modelo_producto->setIdCategoria($_POST['id_categoria']);
            $this->modelo_producto->setNombre($_POST['nombre']);
            $this->modelo_producto->setPrecio($_POST['precio']);
            $this->modelo_producto->setImagenUrl($_POST['imagen_url']);
            $this->modelo_producto->setDescripcion($_POST['descripcion']);
            $this->modelo_producto->setEstado($_POST['estado']);

            // Llamamos al método guardar del modelo para insertar en la base de datos
            if ($this->modelo_producto->crearProducto()) {
                // Redirige al listado de productos con mensaje de éxito
                header('Location: /productos?mensaje=exito');
            } else {
                // Manejo de error
                header('Location: /productos/crear?mensaje=error');
            }
        }
    }

    // Muestra el formulario de edición pre-llenado con datos del producto
    public function editar($id) {
        // Obtiene los datos del producto por su ID
        $producto = $this->modelo_producto->obtenerProductoPorId($id);
        // LLamamos a la vista de edición con el producto
        require_once '../Vista/productos/editar.php';
    }

    // Procesa y actualiza el producto existente
    public function actualizar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Asignamos todos los valores, incluyendo el ID del producto a actualizar
            $this->modelo_producto->setIdProducto($_POST['id_producto']);
            $this->modelo_producto->setIdCategoria($_POST['id_categoria']);
            $this->modelo_producto->setNombre($_POST['nombre']);
            $this->modelo_producto->setPrecio($_POST['precio']);
            $this->modelo_producto->setImagenUrl($_POST['imagen_url']);
            $this->modelo_producto->setDescripcion($_POST['descripcion']);
            $this->modelo_producto->setEstado($_POST['estado']);

            // Llamamos al método del modelo para actualizar
            if ($this->modelo_producto->actualizarProducto()) {
                header('Location: /productos?mensaje=actualizado');
            } else {
                // Manejo de error
                header('Location: /productos/editar?id=' . $_POST['id_producto'] . '&mensaje=error');
            }
        }
    }

    // Método para eliminar un producto por su ID
    public function eliminar($id) {
        // Asignamos el ID para que el modelo sepa qué eliminar
        $this->modelo_producto->setIdProducto($id);

        // Llamamos al método del modelo para eliminar
        if ($this->modelo_producto->eliminarProducto()) {
            header('Location: /productos?mensaje=exito');
        } else {
            // Manejo de error
            header('Location: /productos?mensaje=error');
        }
    }

    // Lectura de un producto por su ID (para vista pública)
    public function porCategoria($id_categoria) {
        // Llama al método del modelo para obtener productos filtrados por ID de categoría
        $productos = $this->modelo_producto->obtenerProductosPorCategoria($id_categoria);

        header('Content-Type: application/json');
        echo json_encode(['productos' => $productos]);
        // Cargamos la vista pública que muestra los productos por categoría
        require_once '../Vista/productos/por_categoria.php';
    }
}
?>