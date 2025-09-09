<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categoria extends Model
{
    use HasFactory;

    protected $table = "categoria";
    protected $primaryKey = "id_categoria";
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'descripcion',
        'imagen_url',
        'estado'
    ];
}
