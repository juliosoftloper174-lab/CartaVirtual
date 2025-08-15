<?php 
require_once 'conexion.php';

// Clase para manejar cupones de descuento
class CuponClass {
    private $id_cupon;
    private $codigo;
    private $descripcion;
    private $fecha_inicio;
    private $fecha_fin;
    private $estado;

    // Constructor de la clase
    public function __construct($id_cupon, $codigo, $descripcion, $fecha_inicio, $fecha_fin, $estado) {
        $this->id_cupon = $id_cupon;
        $this->codigo = $codigo;
        $this->descripcion = $descripcion;
        $this->fecha_inicio = $fecha_inicio;
        $this->fecha_fin = $fecha_fin;
        $this->estado = $estado;
    }

    // Métodos getter
    public function getIdCupon() {
        return $this->id_cupon;
    }
    public function getCodigo() {
        return $this->codigo;
    }
    public function getDescripcion() {
        return $this->descripcion;
    }
    public function getFecha_inicio() {
        return $this->fecha_inicio;
    }
    public function getFecha_fin() {
        return $this->fecha_fin;
    }
}

?>