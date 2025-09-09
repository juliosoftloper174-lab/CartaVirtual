<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    use HasFactory;

    protected $table = "detalle_pedido";
    public $timestamps = false;

    protected $fillable = [
        "id_pedido",
        "id_producto",
        "cantidad",
        "precio_unitario",
    ];

    // Como un detalle de pedido le pertenece a un solo pedido
    public function pedido() {
        return $this->belongsTo(Pedido::class, 'id_pedido', 'id_pedido');
    }

    // Como un detalle de pedido le pertenece a un solo producto
    public function producto() {
        return $this->belongsTo(Producto::class,'id_producto','id_producto');
    }
}
