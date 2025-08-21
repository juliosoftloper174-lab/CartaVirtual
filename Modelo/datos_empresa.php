<?php
require_once '../config/conexion.php';

// Clase para manejar los datos de la empresa
class Empresa {
    private $conexion;
    private $id_empresa;
    private $nombre;
    private $telefono;
    private $ubicacion;
    private $horario;
    private $tiktok_url;
    private $facebook_url;
    private $instagram_url;
    private $video_pres_url;
    private $logo_url;
    private $portada_url;

    // Constructor de la clase con el objeto de conexión PDO
    public function __construct(PDO $conexion) {
        $this->conexion = $conexion;
    }
    
    public function getIdEmpresa() {
        return $this->id_empresa;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function getTelefono() {
        return $this->telefono;
    }
    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }
    public function getUbicacion() {
        return $this->ubicacion;
    }
    public function setUbicacion($ubicacion) {  
        $this->ubicacion = $ubicacion;
    }
    public function getHorario() {
        return $this->horario;
    }
    public function setHorario($horario) {
        $this->horario = $horario;
    }
    public function getTiktokUrl() {
        return $this->tiktok_url;
    }
    public function setTiktokUrl($tiktok_url) {
        $this->tiktok_url = $tiktok_url;
    }
    public function getFacebookUrl() {
        return $this->facebook_url;
    }
    public function setFacebookUrl($facebook_url) {
        $this->facebook_url = $facebook_url;
    }
    public function getInstagramUrl() {
        return $this->instagram_url;
    }
    public function setInstagramUrl($instagram_url) {
        $this->instagram_url = $instagram_url;
    }
    public function getVideoPresUrl() {
        return $this->video_pres_url;
    }
    public function setVideoPresUrl($video_pres_url) {
        $this->video_pres_url = $video_pres_url;
    }
    public function getLogoUrl() {
        return $this->logo_url;
    }
    public function setLogoUrl($logo_url) {
        $this->logo_url = $logo_url;
    }
    public function getPortadaUrl() {
        return $this->portada_url;
    }
    public function setPortadaUrl($portada_url) {
        $this->portada_url = $portada_url;
    }

    // Método para actualizar la portada de la empresa
    public function actualizarPortada() {
        $consulta = "UPDATE empresa SET portada_url = :portada_url";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':portada_url', $this->portada_url);
        return $stmt->execute();
    }

    // Método para eliminar la portada de la empresa
    public function eliminarPortada() {
        $consulta = "UPDATE empresa SET portada_url = NULL";
        $stmt = $this->conexion->prepare($consulta);
        return $stmt->execute();
    }

    // Método para actualizar el logo de la empresa
    public function actualizarLogo() {
        $consulta = "UPDATE empresa SET logo_url = :logo_url";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':logo_url', $this->logo_url);
        return $stmt->execute();
    }

    // Método para eliminar el logo de la empresa
    public function eliminarLogo() {
        $consulta = "UPDATE empresa SET logo_url = NULL";
        $stmt = $this->conexion->prepare($consulta);
        return $stmt->execute();
    }

    // Método para actualizar el facebook de la empresa
    public function actualizarFacebook() {
        $consulta = "UPDATE empresa SET facebook_url = :facebook_url";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':facebook_url', $this->facebook_url);
        return $stmt->execute();
    }

    // Método para actualizar el instagram de la empresa
    public function actualizarInstagram() {
        $consulta = "UPDATE empresa SET instagram_url = :instagram_url";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':instagram_url', $this->instagram_url);
        return $stmt->execute();
    }

    // Método para actualizar el TikTok de la empresa
    public function actualizarTiktok() {
        $consulta = "UPDATE empresa SET tiktok_url = :tiktok_url";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(':tiktok_url', $this->tiktok_url);
        return $stmt->execute();
    }

    // Método para actualizar el video de presentación de la empresa
    public function actualizarVideoPresentacion() {
        $consulta = "UPDATE empresa SET video_pres_url = :video_pres_url";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->bindParam(":video_pres_url", $this->video_pres_url);
        return $stmt->execute();
    }

    // Método para listar los datos de la empresa: direccion, telefono, horario
    public function MostrarDatosEmpresa() {
        $consulta = "SELECT direccion, telefono, horario FROM empresa";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>