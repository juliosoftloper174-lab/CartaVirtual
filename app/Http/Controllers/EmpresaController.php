<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Muestra el único registro de la empresa
     */
    public function show()
    {
        $empresa = Empresa::first();

        if (!$empresa) {
            return response()->json(['message' => 'No se ha encontrado ningún registro de empresa.'], 404);
        }

        return response()->json($empresa, 200);
    }

    /**
     * Actualiza el registro existente de la empresa
     */
    public function update(Request $request, $id)
    {
        $empresa = Empresa::find($id);

        if (!$empresa) {
            return response()->json(['message' => 'El registro de la empresa a actualizar no existe.'], 404);
        }

        $request->validate([
            // Datos de la empresa (obligatorios)
            'nombre' => 'required|string|max:300',
            'telefono' => 'required|string|size:9',
            'ubicacion' => 'required|string|max:255',
            'horario' => 'required|string|max:300',

            // Redes sociales (opcionales)
            'tiktok_url' => 'nullable|url|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'video_pres_url' => 'nullable|url|max:255',
        ]);

        // Actualizamos
        $empresa->update($request->all());

        return response()->json([
            'message' => 'Datos de la empresa actualizados correctamente.',
            'empresa' => $empresa
        ], 200);
    }
}
