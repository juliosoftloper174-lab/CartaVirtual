<?php
require_once '../config/conexion.php';

class Terminos {
    private $conexion;
    private $id_terminos;
    private $titulo;
    private $descripcion;

    // Constructor de la clase con el objeto de conexión PDO
    public function __construct(PDO $conexion) {
        $this->conexion = $conexion;
    }

    // Métodos getter y setter
    public function getIdTerminos() {
        return $this->id_terminos;
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

    // Método para actualizar los términos y condiciones en la base de datos
    public function actualizarTerminos() {
        $consulta = "UPDATE terminos SET titulo = :titulo, descripcion = :descripcion";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(":titulo", $this->titulo);
        $stmt->bindParam(":descripcion", $this->descripcion);
        return $stmt->execute();
    }

    // Método para obtener los términos y condiciones de la base de datos
    public function obtenerTerminos() {
        $consulta = "SELECT titulo, descripcion FROM terminos";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>