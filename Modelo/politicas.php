<?php
require_once '../config/conexion.php';

class Politicas {
    private $conexion;
    private $id_politicas;
    private $titulo;
    private $descripcion;

    // Constructor de la clase con el objeto de conexión PDO
    public function __construct(PDO $conexion) {
        $this->conexion = $conexion;
    }

    // Métodos getter y setter
    public function getIdPoliticas() {
        return $this->id_politicas;
    }
    public function getTitulo() {
        return $this->titulo;
    }
    public function getDescripcion() {
        return $this->descripcion;
    }
    public function setTitulo($titulo) {
        $this->titulo = $titulo;
    }
    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    // Método para actualizar las políticas en la base de datos
    public function actualizarPoliticas() {
        $consulta = "UPDATE politicas SET titulo = :titulo, descripcion = :descripcion";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(":titulo", $this->titulo);
        $stmt->bindParam(":descripcion", $this->descripcion);
        return $stmt->execute();
    }

    // Método para obtener las políticas de la base de datos
    public function obtenerPoliticas() {
        $consulta = "SELECT titulo, descripcion FROM politicas";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>