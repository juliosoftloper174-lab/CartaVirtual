<?php
require_once "config/conexion.php"; // Importar la conexión

class Categoria {
    private $conn;
    private $table_name = "categoria";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todas las categorías
    public function obtenerCategorias() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Crear una categoría
    public function crearCategoria($nombre) {
        $query = "INSERT INTO " . $this->table_name . " (nombre) VALUES (:nombre)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $nombre);
        return $stmt->execute();
    }

    // Obtener una categoría por ID
    public function obtenerCategoriaPorId($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Actualizar una categoría
    public function actualizarCategoria($id, $nombre) {
        $query = "UPDATE " . $this->table_name . " SET nombre = :nombre WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    // Eliminar una categoría
    public function eliminarCategoria($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }
}
