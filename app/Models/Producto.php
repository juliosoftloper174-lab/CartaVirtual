<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    public function categoria() {
        return $this->belongsTo(Categoria::class, 'id_categoria', 'id_categoria');
    }
    
    use HasFactory;

    protected $table = "producto";
    protected $primaryKey = "id_producto";
    public $timestamps = false;

    protected $fillable = [
        "id_categoria",
        "nombre",
        "precio",
        "imagen_url",
        "descripcion",
        "estado"
        ];
}
