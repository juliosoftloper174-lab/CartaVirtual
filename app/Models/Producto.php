<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    use HasFactory;

    protected $table = "producto";
    protected $primaryKey = "id_producto";
    public $timestamps = false;

    protected $fillable = [
        'id_categoria',
        'nombre',
        'precio',
        'imagen_url',
        'descripcion',
        'estado'
    ];
}
