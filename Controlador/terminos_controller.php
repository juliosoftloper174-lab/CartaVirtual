<?php
require_once '../config/conexion.php';
require_once '../Modelo/terminos.php';

class TerminosController {
    private $modelo_terminos;

    public function __contruct() {
        global $conexion;
        $this->modelo_terminoss = new Terminos($conexion);
    }

    // Muestra la página de términos y condiciones al público
    public function index() {
        $terminos = $this->modelo_terminos->obtenerTerminos();
        require_once '../Vista/terminos/index.php';
    }

    // Método para editar los términos y condiciones (solo para administradores)
    public function editar() {
        $terminos = $this->modelo_terminos->obtenerTerminos();
        require_once '../Vista/terminos/editar.php';
    }

    // Método para actualizar los términos y condiciones (solo para administradores)
    public function actualizar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Asigna los datos del formulario a las propiedades del objeto
            $this->modelo_terminos->setTitulo($_POST['titulo']);
            $this->modelo_terminos->setDescripcion($_POST['descripcion']);

            // LLamamos al método para actualizar los términos y condiciones
            if ($this->modelo_terminos->actualizarTerminos()) {
                header('Location: /terminos/editar?mensaje=exito');
            } else {
                header('Location: /terminos/editar?mensaje=error');
            }
        }
    }
}
?>