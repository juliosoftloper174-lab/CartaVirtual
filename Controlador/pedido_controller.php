<?php
require_once '../config/conexion.php';
require_once '../Modelo/detalle_pedido.php';
require_once '../Modelo/pedido.php';

class PedidoController {
    private $modelo_pedido;
    private $modelo_detalle_pedido;

    public function __construct() {
        global $conexion;
        $this->modelo_pedido = new Pedido($conexion);
        $this->modelo_detalle_pedido = new Pedido($conexion);
    }

    // 1. Muestra el formulario de confirmación de pedido.
    // Asume que los datos del carrito están en la sesión.
    public function confirmar() {
        // En una aplicación real, aquí cargarías los datos del carrito desde la sesión.
        $carrito = $_SESSION['carrito'] ?? [];

        if (empty($carrito)) {
            // Redirige al menú si el carrito está vacío.
            header('Location: /productos');
            return;
        }

        // Carga la vista para que el cliente ingrese sus datos y confirme.
        require_once '../Vista/pedido/confirmar.php';
    }

    // 2. Procesa la creación del pedido.
    public function crear() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Asume que los datos del cliente y del carrito están disponibles.
            $carrito = $_SESSION['carrito'] ?? [];

            if (empty($carrito)) {
                // Redirige si el carrito está vacío.
                header('Location: /productos');
                return;
            }

            // Inicia una transacción para asegurar que todas las inserciones se hagan correctamente.
            $this->modelo_pedido->beginTransaction();

            // Paso 1: Crea el pedido principal en la tabla 'pedido'.
            $this->modelo_pedido->setNomCliente($_POST['nom_cliente']);
            $this->modelo_pedido->setTelefCliente($_POST['telef_cliente']);
            $this->modelo_pedido->setDireccionEnvio($_POST['direccion_envio']);
            $this->modelo_pedido->setObservaciones($_POST['observaciones']);
            $this->modelo_pedido->setMetodoPago($_POST['metodo_pago']);

            $id_pedido_creado = $this->modelo_pedido->crearPedido();

            if ($id_pedido_creado) {
                // Paso 2: Inserta cada producto del carrito en 'detalle_pedido'.
                $detalles_correctos = true;
                foreach ($carrito as $item) {
                    $this->modelo_detalle_pedido->setIdPedido($id_pedido_creado);
                    $this->modelo_detalle_pedido->setIdProducto($item['id']);
                    $this->modelo_detalle_pedido->setCantidad($item['cantidad']);
                    $this->modelo_detalle_pedido->setPrecioUnitario($item['precio']);

                    if (!$this->modelo_detalle_pedido->guardarDetalle()) {
                        $detalles_correctos = false;
                        break; // Sale del bucle si falla una inserción.
                    }
                }

                if ($detalles_correctos) {
                    // Si todo salió bien, confirma la transacción.
                    $this->modelo_pedido->commit();
                    // Limpia el carrito de la sesión.
                    unset($_SESSION['carrito']);
                    // Redirige a una página de confirmación.
                    header('Location: /pedido/confirmacion?id=' . $id_pedido_creado);
                } else {
                    // Si algo falló, deshace la transacción.
                    $this->modelo_pedido->rollback();
                    header('Location: /pedido/confirmar?mensaje=error_detalle');
                }
            } else {
                // Si la inserción del pedido principal falló, redirige con error.
                $this->modelo_pedido->rollback();
                header('Location: /pedido/confirmar?mensaje=error_pedido');
            }
        }
    }

    // 3. Muestra una página de confirmación al cliente.
    public function confirmacion($id) {
        $pedido = $this->modelo_pedido->obtenerPorId($id); // Este método lo agregaríamos en el modelo Pedido.
        $detalles = $this->modelo_detalle_pedido->obtenerDetallePorPedido($id);

        require_once '../Vista/pedido/confirmacion.php';
    }

    // Métodos para el panel de administración
    public function indexAdmin() {
        $pedidos = $this->modelo_pedido->obtenerTodos();
        require_once '../Vista/admin/pedidos/index.php';
    }

    public function verDetalleAdmin($id) {
        $pedido = $this->modelo_pedido->obtenerPorId($id);
        $detalles = $this->modelo_detalle_pedido->obtenerDetallePorPedido($id);
        require_once '../Vista/admin/pedidos/detalle.php';
    }
}
?>