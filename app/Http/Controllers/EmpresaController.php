<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;

class EmpresaController extends Controller
{
    public function show() {
        $empresa = Empresa::find(1);

        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada.'], 404);
        }
        return response()->json($empresa);
    }

    public function update(Request $request) {
        $empresa = Empresa::find(1);
        
        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada.'],404);
        }

        $empresa->update($request->all());

        return response()->json(['message' => 'Datos de la empresa actualizados correctamente.']);
    }

    public function eliminarPortada() {
        $empresa = Empresa::find(1);

        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada.'],404);
        }

        $empresa->update(['portada_url' => null]);

        return response()->json(['message' => 'Portada de la empresa eliminada.']);
    }

    public function eliminarLogo() {
        $empresa = Empresa::find(1);

        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada.'], 404);
        }

        $empresa->update(['logo_url'=> null]);

        return response()->json(['message' => 'Logo de la empresa eliminado.']);
    }
}
