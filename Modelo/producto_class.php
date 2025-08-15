<?php 
require_once 'conexion.php';
require_once 'categoria_class.php';

// Clase para manejar productos
class Producto {
    private $conexion;
    private $id_producto;
    private $id_categoria;
    private $nombre;
    private $precio;
    private $imagen_url;
    private $descripcion;
    private $estado;

    // Constructor de la clase con el objeto de conexión PDO
    public function __construct(PDO $conexion) {
        $this->conexion = $conexion;
    }

    // Métodos getter y setter
    public function getIdProducto() {
        return $this->id_producto;
    }
    public function setIdProducto($id_producto) {
        $this->id_producto = $id_producto;
    }
    public function getIdCategoria() {
        return $this->id_categoria;
    }
    public function setIdCategoria($id_categoria) {
        $this->id_categoria = $id_categoria;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function getPrecio() {
        return $this->precio;
    }
    public function setPrecio($precio) {
        $this->precio = $precio;
    }
    public function getimagen_url() {
        return $this->imagen_url;
    }
    public function setImagenUrl($imagen_url) {
        $this->imagen_url = $imagen_url;
    }
    public function getDescripcion() {
        return $this->descripcion;
    }
    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }
    public function getEstado() {
        return $this->estado;
    }
    public function setEstado($estado) {
        $this->estado = $estado;    
    }

    // Método para guardar el producto en la base de datos con PDO
    public function guardarProducto() {
        $consulta = "INSERT INTO productos (id_categoria, nombre, precio, imagen_url, descripcion, estado) VALUES (:id_categoria, :nombre, :precio, :imagen_url, :descripcion, :estado)";
        $stmt = $this->conexion->prepare($consulta);

        $stmt->bindParam(':id_categoria', $this->id_categoria);
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':precio', $this->precio);
        $stmt->bindParam(':imagen_url', $this->imagen_url);
        $stmt->bindParam(':descripcion', $this->descripcion);
        $stmt->bindParam(':estado', $this->estado);
        return $stmt->execute();
    }

    // Método para obtener todos los productos en la base de datos
    public function obtenerProductos() {
        $consulta = "CALL ProductosActivos()";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para obtener productos por categoría
    public function obtenerProductosPorCategoria($id_categoria) {
        $consulta = "CALL ProductosPorCategoria(:id_categoria)";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':id_categoria', $id_categoria, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>