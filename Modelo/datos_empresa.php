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

    // Método para eliminar la portada de la empresa
    public function eliminarPortada() {
        $consulta = "UPDATE empresa SET portada_url = NULL";
        $stmt = $this->conexion->prepare($consulta);
        return $stmt->execute();
    }

    // Método para eliminar el logo de la empresa
    public function eliminarLogo() {
        $consulta = "UPDATE empresa SET logo_url = NULL";
        $stmt = $this->conexion->prepare($consulta);
        return $stmt->execute();
    }

    // Método para listar los datos de la empresa: ubicacion, telefono, horario
    public function MostrarDatosEmpresa() {
        $consulta = "SELECT nombre, telefono, ubicacion, horario, tiktok_url, facebook_url, instagram_url, video_pres_url, logo_url, portada_url FROM empresa";
        $stmt = $this->conexion->prepare($consulta);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Método para actualizar los datos de la empresa
    public function actualizarDatosEmpresa() {
        $consulta = "UPDATE empresa SET
            nombre = :nombre,
            telefono = :telefono,
            ubicacion = :ubicacion,
            horario = :horario,
            tiktok_url = :tiktok_url,
            facebook_url = :facebook_url,
            instagram_url = :instagram_url,
            video_pres_url = :video_pres_url,
            logo_url = :logo_url,
            portada_url = :portada_url
            WHERE id_empresa = 1"; // Esto es así ya que solo hay un registro en la tabla empresa

            $stmt = $this->conexion->prepare($consulta);
            $stmt->bindParam(':nombre', $this->nombre);
            $stmt->bindParam(':telefono', $this->telefono);
            $stmt->bindParam(':ubicacion', $this->ubicacion);
            $stmt->bindParam(':horario', $this->horario);
            $stmt->bindParam(':tiktok_url', $this->tiktok_url);
            $stmt->bindParam(':facebook_url', $this->facebook_url);
            $stmt->bindParam(':instagram_url', $this->instagram_url);
            $stmt->bindParam(':video_pres_url', $this->video_pres_url);
            $stmt->bindParam(':logo_url', $this->logo_url);
            $stmt->bindParam(':portada_url', $this->portada_url);
            $stmt->execute();
    }
}
?>