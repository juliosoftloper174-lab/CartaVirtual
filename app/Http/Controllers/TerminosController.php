<?php

namespace App\Http\Controllers;

use App\Models\Terminos;
use Illuminate\Http\Request;

class TerminosController extends Controller
{
    // Método para mostrar los términos y condiciones
    public function show()
    {
        $terminos = Terminos::first();

        if (!$terminos) {
            return response()->json(['message' => 'Términos y condiciones no encontrados.'],404);
        }

        return response()->json($terminos);
    }

    // Método para actualizar los términos y condiciones
    public function update(Request $request)
    {
        $terminos = Terminos::first();

        if (!$terminos) {
            return response()->json(['message' => 'Términos y condiciones no encontrados.'],404);
        }

        $request->validate([
            'titulo' => 'sometimes|required|string|max:100',
            'descripcion' => 'sometimes|required|string',
        ]);

        $terminos->update($request->all());

        return response()->json(['message' => 'Términos y condiciones actualizados', 'terminos' => $terminos]);
    }
}
