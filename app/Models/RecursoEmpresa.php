<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecursoEmpresa extends Model
{
    use HasFactory;

    protected $table = 'recursos_empresa';
    protected $primaryKey = 'id_recurso';
    public $timestamps = false;

    protected $fillable = [
        'logo_url',
        'portada_url'
    ];
}
