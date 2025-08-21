<?php
require_once '../config/conexion.php';

class Admin {
    private $conexion;
    private $nombre;
    private $email;

    // Constructor de la clase con el objeto de conexión PDO
    public function __construct(PDO $conexion) {
        $this->conexion = $conexion;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function getEmail() {
        return $this->email;
    }

    // Método para obtener los datos del administrador
    public function obtenerDatosAdmin() {
        $consulta = "SELECT nombre, email FROM administrador";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->execute();
        $datos = $stmt->fetch(PDO::FETCH_ASSOC);
        return $datos;
    }
}
?>