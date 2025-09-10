<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';

    protected $fillable = [
        'user_id',
        'total',
        'estado', // Opcional: Creado, Pagado, Enviado, etc.
    ];

    // Relación con los detalles del pedido
    public function detalles()
    {
        return $this->hasMany(PedidoDetalle::class, 'pedido_id');
    }

    // Relación con el usuario que realizó el pedido (opcional)
    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
