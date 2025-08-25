<?php
require_once '../Modelo/admin.php';
require_once '../config/conexion.php';

class AdminController {
    private $modelo_admin;

    public function __construct() {
        global $conexion; // Usar la conexión global
        $this->modelo_admin = new Admin($conexion);
    }

    // Método para manejar la solicitud y obtener los datos del administrador
    public function index() {
        // Llama al método del modelo para obtener los datos del administrador
        $admin = $this->modelo_admin->obtenerDatosAdmin();

        // Incluímos la vista y pasamos los datos del administrador
        require_once '../Vista/admin/index.php';
    }
}
?>