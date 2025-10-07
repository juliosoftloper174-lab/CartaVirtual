<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cupon extends Model
{
    use HasFactory;

    protected $table = 'cupon';
    protected $primaryKey = 'id_cupon';
    public $timestamps = false;

    protected $fillable = [
        'codigo',
        'tipo',
        'valor',
        'id_categoria',
        'id_producto',
        'descripcion',
        'fecha_inicio',
        'fecha_fin',
        'estado',
        'cantidad_total',
        'cantidad_usada',
    ];

    protected $casts = [
        'fecha_inicio' => 'datetime',
        'fecha_fin' => 'datetime',
        'estado' => 'boolean',
        'valor' => 'decimal:2',
        'cantidad_total' => 'integer',
        'cantidad_usada' => 'integer',
    ];
}
