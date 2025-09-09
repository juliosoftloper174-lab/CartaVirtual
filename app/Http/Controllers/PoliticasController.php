<?php

namespace App\Http\Controllers;

use App\Models\Politicas;
use Illuminate\Http\Request;

class PoliticasController extends Controller
{
    // Método para mostrar las políticas de privacidad
    public function show()
    {
        $politicas = Politicas::first();

        if (!$politicas) {
            return response()->json(['message' => 'Términos y condiciones no encontrados.'],404);
        }

        return response()->json($politicas);
    }

    // Método para actualizar las políticas
    public function update(Request $request)
    {
        $politicas = Politicas::first();

        if (!$politicas) {
            return response()->json(['message' => 'Políticas de privacidad no encontradas.'],404);
        }

        $request->validate([
            'titulo' => 'sometimes|required|string|max:100',
            'descripcion' => 'sometimes|required|string',
        ]);

        $politicas->update($request->all());

        return response()->json(['message' => 'Políticas de privacidad actualizadas.', 'politicas' => $politicas]);
    }
}
