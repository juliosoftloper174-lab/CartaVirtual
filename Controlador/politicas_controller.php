<?php
require_once '../config/conexion.php';
require_once '../Modelo/cupon_class.php';

class PoliticasCrontroller {
    private $modelo_politicas;

    public function __construct() {
        global $conexion;
        $this->modelo_politicas = new Politicas($conexion);
    }

    // Muestra la página de políticas al público
    public function index() {
        $politicas = $this->modelo_politicas->obtenerPoliticas();
        // Cargamos la vista que mostrará el contenido al público
        require_once '../Vista/politicas/index.php';
    }

    // Método para editar las políticas (solo para administradores)
    public function editar() {
        // Llama al modelo para obtener los datos y pre-llenar el formulario
        $politicas = $this->modelo_politicas->obtenerPoliticas();
        require_once '../Vista/politicas/editar.php';
    }

    // Método para actualizar las políticas (solo para administradores)
    public function actualizar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->modelo_politicas->setTitulo($_POST['titulo']);
            $this->modelo_politicas->setDescripcion($_POST['descripcion']);

            // LLamamos al método para actualizar las políticas
            if ($this->modelo_politicas->actualizarPoliticas()) {
                header('Location: /politicas/editar?mensaje=exito');
            } else {
                header('Location: /politicas/editar?mensaje=error');
            }
        }
         
    }
}
?>