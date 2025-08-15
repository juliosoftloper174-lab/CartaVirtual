<?php 
require_once 'conexion.php';

// Clase para manejar categorías de productos
class Categoria {
    private $conexion;
    private $id_categoria;
    private $nombre;
    private $descripcion;
    private $imagen_url;
    private $estado;

    // Constructor de la clase con el objeto de conexión PDO
    public function __construct(PDO $conexion) {
        $this->conexion = $conexion;
    }

    public function getIdCategoria() {
        return $this->id_categoria;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function getDescripcion() {
        return $this->descripcion;
    }
    public function getImagenUrl() {
        return $this->imagen_url;
    }
    public function getEstado() {
        return $this->estado;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }
    public function setImagenUrl($imagen_url) {
        $this->imagen_url = $imagen_url;
    }
    public function setEstado($estado) {
        $this->estado = $estado;
    }

    // Método para guardar la categoría en la base de datos con PDO
    public function guardarCategoria() {
        $consulta = "INSERT INTO categorias (nombre, descripcion, imagen_url, estado) VALUES (:nombre, :descripcion, :imagen_url, :estado)";
        $stmt = $this->conexion->prepare($consulta);

        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':descripcion', $this->descripcion);
        $stmt->bindParam(':imagen_url', $this->imagen_url);
        $stmt->bindParam(':estado', $this->estado);
        return $stmt->execute();
    }

    //Método para obtener todas las categorías en la base de datos
    public function obtenerCategorias() {
        $consulta = "CALL CategoriasActivas()";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>