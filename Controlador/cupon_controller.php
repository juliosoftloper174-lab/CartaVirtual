<?php
require_once("../config/conexion.php");
require_once("../Modelo/cupon_class.php");

class Cupon_controller {
    private $modelo_cupon;
    public function __construct() {
        global $conexion;
        $this->modelo_cupon = new Cupon($conexion);
    }

    // Método para listar cupones (solo se debe usar en el administrador)
    public function index() {
        $cupones = $this->modelo_cupon->obtenerCupones();
        // Cargamos la vista con los cupones
        require_once '../Vista/cupones/index.php';
    }

    // Método para mostrar la creación de un nuevo cupón
    public function crear() {
        // Cargamos la vista del formulario de creación
        require_once '../Vista/cupones/crear.php';
    }

    // Método para guardar un nuevo cupón
    public function guardar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->modelo_cupon->setCodigo($_POST['codigo']);
            $this->modelo_cupon->setDescripcion($_POST['descripcion']);
            $this->modelo_cupon->setFecha_inicio($_POST['fecha_inicio']);
            $this->modelo_cupon->setFecha_fin($_POST['fecha_fin']);
            $this->modelo_cupon->setEstado($_POST['estado']);

            // Llamamos al método crearCupon del modelo
            if ($this->modelo_cupon->crearCupon()) {
                header('Location: /cupones?mensaje=exito');
            } else {
                // Manejo de error
                header('Location: /cupones/crear?mensaje=error');
            }
        }
    }

    // Método para editar un cupón
    public function editar($id) {
        $cupon = $this->modelo_cupon->obtenerCuponPorId($id);
        // LLamamos a la vista de edición con el cupón
        require_once '../Vista/cupones/editar.php';
    }

    // Método para actualizar un cupón
    public function actualizar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->modelo_cupon->setIdCupon($_POST['id_cupon']);
            $this->modelo_cupon->setCodigo($_POST['codigo']);
            $this->modelo_cupon->setDescripcion($_POST['descripcion']);
            $this->modelo_cupon->setFecha_inicio($_POST['fecha_inicio']);
            $this->modelo_cupon->setFecha_fin($_POST['fecha_fin']);
            $this->modelo_cupon->setEstado($_POST['estado']);

            // Llamamos al método actualizarCupon del modelo
            if ($this->modelo_cupon->actualizarCupon()) {
                header('Location: /cupones?mensaje=exito');
            } else {
                // Manejo de error
                header('Location: /cupones/editar?id=' . $_POST['id_cupon'] . '&mensaje=error');
            }
        }
    }

    // Método para cambiar el estado de un cupón a inactivo
    public function cambiarEstado($id) {
        $this->modelo_cupon->setIdCupon($id);
        if ($this->modelo_cupon->cambiarEstadoCupon()) {
            header('Location: /cupones?mensaje=exito');
        } else {
            // Manejo de error
            header('Location: /cupones?mensaje=error');
        }
    }

    // Método para validar un cupón (uso en el frontend)
    public function validarCupon($codigo) {
        $cupon = $this->modelo_cupon->verificarCuponValido($codigo);
        // Aquí va la parte del codigo que maneja la respuesta JSON al frontend
        // Retornamos la respuesta en formato JSON
        header('Content-Type: application/json');
        echo json_encode(['cupon' => $cupon]);
    }
}
?>