<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use Illuminate\Http\Request;

class AdministradorController extends Controller
{
    // Método para mostrar los datos del administrador
    public function show()
    {
        $admin = Administrador::first();
        if (!$admin) {
            return response()->json(['message' => 'Administrador no encontrado.'],404);
        }
        return response()->json($admin);
    }
}
