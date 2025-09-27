<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Politicas extends Model
{
    use HasFactory;

    protected $table = "politicas";
    protected $primaryKey = "id_politicas";
    public $timestamps = false;

    protected $fillable = [
        "titulo",
        "descripcion",
    ];
}
