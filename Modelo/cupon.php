<?php 
require_once '../config/conexion.php';

// Clase para manejar cupones de descuento
class Cupon {
    private $conexion;
    private $id_cupon;
    private $codigo;
    private $descripcion;
    private $fecha_inicio;
    private $fecha_fin;
    private $estado;

    // Constructor de la clase con el objeto de conexión PDO
    public function __construct(PDO $conexion) {
        $this->conexion = $conexion;
    }

    // Métodos getter
    public function getIdCupon() {
        return $this->id_cupon;
    }
    public function getCodigo() {
        return $this->codigo;
    }
    public function getDescripcion() {
        return $this->descripcion;
    }
    public function getFecha_inicio() {
        return $this->fecha_inicio;
    }
    public function getFecha_fin() {
        return $this->fecha_fin;
    }
    public function getestado() {
        return $this->estado;
    }
    public function setIdCupon($id_cupon) {
        $this->id_cupon = $id_cupon;
    }
    public function setCodigo($codigo) {
        $this->codigo = $codigo;
    }
    public function setDescripcion($descripcion) { 
        $this->descripcion = $descripcion;
    }
    public function setFecha_inicio($fecha_inicio) {
        $this->fecha_inicio = $fecha_inicio;
    }
    public function setFecha_fin($fecha_fin) {
        $this->fecha_fin = $fecha_fin;
    }
    public function setEstado($estado) {
        $this->estado = $estado;
    }

    // Método para crear un nuevo cupón en la base de datos
    public function crearCupon() {
        $consulta = "INSERT INTO cupon (codigo, descripcion, fecha_inicio, fecha_fin, estado) VALUES (:codigo, :descripcion, :fecha_inicio, :fecha_fin, :estado)";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':codigo', $this->codigo);
        $stmt->bindParam(':descripcion', $this->descripcion);
        $stmt->bindParam(':fecha_inicio', $this->fecha_inicio);
        $stmt->bindParam(':fecha_fin', $this->fecha_fin);
        $stmt->bindParam(':estado', $this->estado);
        return $stmt->execute();
    }

    // Método para obtener todos los cupones de la base de datos
    public function obtenerCupones() {
        $consulta = "SELECT * FROM cupon";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para obtener un cupón por su ID
    public function obtenerCuponPorId($id_cupon) {
        $consulta = "SELECT * FROM cupon WHERE id_cupon = :id_cupon";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(":id_cupon", $id_cupon, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Método para actualizar un cupón en la base de datos
    public function actualizarCupon() {
        $consulta = "UPDATE cupon SET codigo = :codigo, descripcion = :descripcion, fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin, estado = :estado WHERE id_cupon = :id_cupon";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':codigo', $this->codigo);
        $stmt->bindParam(':descripcion', $this->descripcion);
        $stmt->bindParam(':fecha_inicio', $this->fecha_inicio);
        $stmt->bindParam(':fecha_fin', $this->fecha_fin);
        $stmt->bindParam(':estado', $this->estado);
        $stmt->bindParam(':id_cupon', $this->id_cupon);
        return $stmt->execute();
    }

    // Método para poner un cupón a inactivo de la base de datos
    public function cambiarEstadoCupon() {
        $consulta = "UPDATE cupon SET estado = 'No' WHERE id_cupon = :id_cupon";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':id_cupon', $this->id_cupon, PDO::PARAM_INT);
        return $stmt->execute();
    }

    // Método para verificar si un cupón es válido para la fecha actual
    public function verificarCuponValido($codigo) {
        $consulta = "SELECT * FROM cupon WHERE codigo = :codigo AND estado = 'Si' AND fecha_fin <= NOW()";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':codigo', $codigo);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

}

?>