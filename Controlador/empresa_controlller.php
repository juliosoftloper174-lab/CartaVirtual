<?php
require_once '../config/conexion.php';
require_once '../Modelo/datos_empresa.php';

class EmpresaController {
    private $modelo_empresa;

    public function __construct() {
        global $conexion;
        $this->modelo_empresa = new Empresa($conexion);
    }

    // Método para mostrar los datos de la empresa
    public function index() {
        $empresa = $this->modelo_empresa->MostrarDatosEmpresa();
        // Cargamos la vista con los datos de la empresa
        require_once '../Vista/empresa/index.php';
    }

    // Método para actualizar los datos de la empresa
    public function actualizar() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->modelo_empresa->setNombre($_POST['nombre']);
            $this->modelo_empresa->setTelefono($_POST['telefono']);
            $this->modelo_empresa->setUbicacion($_POST['ubicacion']);
            $this->modelo_empresa->setHorario($_POST['horario']);
            $this->modelo_empresa->setTiktokUrl($_POST['tiktok_url']);
            $this->modelo_empresa->setFacebookUrl($_POST['facebook_url']);
            $this->modelo_empresa->setInstagramUrl($_POST['instagram_url']);
            $this->modelo_empresa->setVideoPresUrl($_POST['video_pres_url']);
            $this->modelo_empresa->setLogoUrl($_POST['logo_url']);
            $this->modelo_empresa->setPortadaUrl($_POST['portada_url']);

            // Llama al método del modelo para actualizar la única fila en la base de datos
            if ($this->modelo_empresa->actualizarDatosEmpresa()) {
                header('Location: /empresa?mensaje=exito');
            } else {
                header('Location: /empresa?mensaje=error');
            }
        }
    }
}
?>