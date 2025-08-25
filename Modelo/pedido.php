<?php
require_once '../config/conexion.php';

// Clase para manejar el carrito de compras
class Pedido {
    private $conexion;
    private $id_pedido;
    private $nom_cliente;
    private $telef_cliente;
    private $direccion_envio;
    private $observaciones;
    private $metodo_pago;
    private $fecha_pedido;
    private $estado_pedido;

    // Constructor de la clase con el objeto de conexión PDO
    public function __construct(PDO $conexion) {
        $this->conexion = $conexion;
    }

    // Métodos getters y setters
    public function getIdPedido() {
        return $this->id_pedido;
    }
    public function setIdPedido($id_pedido) {
        $this->id_pedido = $id_pedido;
    }
    public function setNomCliente($nom_cliente) {
        $this->nom_cliente = $nom_cliente;
    }
    public function setTelefCliente($telef_cliente) {
        $this->telef_cliente = $telef_cliente;
    }
    public function setDireccionEnvio($direccion_envio) {
        $this->direccion_envio = $direccion_envio;
    }
    public function setObservaciones($observaciones) {
        $this->observaciones = $observaciones;
    }
    public function setMetodoPago($metodo_pago) {
        $this->metodo_pago = $metodo_pago;
    }
    public function setEstadoPedido($estado_pedido) {
        $this->estado_pedido = $estado_pedido;
    }

    public function crearPedido() {
        $consulta = "INSERT INTO pedido (nom_cliente, telef_cliente, direccion_envio, obserrvaciones, metodo_pago, fecha_pedido, estado_pedido)
        VALUES (:nom_cliente, :telef_cliente, :direccion_envio, :observaciones, :metodo_pago, NOW(), 'Pendiente')";

        $stmt = $this->conexion->prepare($consulta);

        $stmt->bindParam(':nom_cliente', $this->nom_cliente);
        $stmt->bindParam(':telef_cliente', $this->telef_cliente);
        $stmt->bindParam(':direccion_envio', $this->direccion_envio);
        $stmt->bindParam(':observaciones', $this->observaciones);
        $stmt->bindParam(':metodo_pago', $this->metodo_pago);

        if ($stmt->execute()) {
            // Devuelve el ID de la última inserción, servirá para DetallePedido
            return $this->conexion->lastInsertId();
        }
        return false;
    }

    // Método para obtener todos los pedidos (para el panel de administración)
    public function obtenerTodos() {
        $consulta = "SELECT * FROM pedido ORDER BY fecha_pedido DESC";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    // Método para actualizar el estado de un pedido ('Pendiente' -> 'Entregado')
    public function actualizarEstado() {
        $consulta = "UPDATE pedido SET estado_pedido = :estado WHERE id_pedido =:id_pedido";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(":estado", $this->estado_pedido);
        $stmt->bindParam(":id_pedido", $this->id_pedido, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
?>