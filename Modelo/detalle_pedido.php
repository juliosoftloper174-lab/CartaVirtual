<?php
require_once '../config/conexion.php';
require_once 'pedido.php';
require_once 'producto_class.php';

class DetallePedido {
    private $conexion;
    private $id_pedido;
    private $id_produto;
    private $cantidad;
    private $precio_unitario;

    public function __construct(PDO $conexion) {
        $this->conexion = $conexion;
    }
    public function setIdPedido($id_pedido) {
        $this->id_pedido = $id_pedido;
    }
    public function setIdProducto($id_producto) {
        $this->id_producto = $id_producto;
    }
    public function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
    }
    public function setPrecioUnitario($precio_unitario) {
        $this->precio_unitario = $precio_unitario;
    }

    public function guardarDetalle() {
        $consulta = "INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
        VALUES (:id_pedido, :id_producto, :cantidad, :precio_unitario)";

        $stmt = $this->conexion->prepare($consulta);

        $stmt->bindParam(':id_pedido', $this->id_pedido, PDO::PARAM_INT);
        $stmt->bindParam(':id_producto', $this->id_produto, PDO::PARAM_INT);
        $stmt->bindParam(':cantidad', $this->cantidad, PDO::PARAM_INT);
        $stmt->bindParam(':precio_unitario', $this->precio_unitario);

        return $stmt->execute();
    }

    public function obtenerDetallePorPedido($id_pedido){
        // Se va a unir con 'producto' para obtener el nombre del producto en lugar de solo el ID
        $consulta = "SELECT
        d.*, p.nombre AS nombre_producto, p.imagen_url
        FROM detalle_pedido d
        JOIN producto p ON d.id_producto = p.id_producto
        WHERE d.id_pedido = :id_pedido";
    
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':id_pedido', $id_pedido, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>