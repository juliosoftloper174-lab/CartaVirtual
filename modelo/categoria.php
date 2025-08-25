<?php
require_once "conexion.php";

class Categoria {
    private $conn;

    public function __construct() {
        $this->conn = Conexion::conectar();
    }

    public function obtenerCategorias() {
        $stmt = $this->conn->prepare("SELECT id, nombre, imagen FROM categoria");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
