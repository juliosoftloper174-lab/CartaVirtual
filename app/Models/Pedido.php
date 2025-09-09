<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = "pedido";
    protected $primaryKey = "id_pedido";
    public $timestamps = false;

    protected $fillable = [
        "nom_cliente",
        "telef_cliente",
        "direccion_envio",
        "observaciones",
        "metodo_pago",
        "fecha_pedido",
        "estado_pedido",
    ];

    protected $casts = [
        "fecha_pedido" => "datetime",
        "estado_pedido" => "boolean",
    ];

    // Como un pedido tiene muchos detalles de pedido, se hace esto:
    public function detalles() {
        return $this->hasMany(DetallePedido::class, 'id_pedido', 'id_pedido');
    }
}
