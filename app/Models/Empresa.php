<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = "empresa";
    protected $primaryKey = "id_empresa";
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'telefono',
        'ubicacion',
        'horario',
        'tiktok_url',
        'facebook_url',
        'instagram_url',
        'video_pres_url',
        'logo_url',
        'portada_url'
    ] ;
}
