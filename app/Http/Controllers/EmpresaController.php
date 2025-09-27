<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
use Illuminate\Support\Facades\Storage;

class EmpresaController extends Controller
{
    // Ver los datos de la empresa
    public function show()
    {
        $empresa = Empresa::find(1);

        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada.'], 404);
        }

        return response()->json($empresa);
    }

    // Actualizar datos de la empresa (incluye imágenes y URL de YouTube)
    public function update(Request $request)
    {
        $empresa = Empresa::find(1);

        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada.'], 404);
        }

        // Si se sube un logo nuevo
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('empresa/Logos', 'public');
            $empresa->logo_url = $logoPath;
        }

        // Si se sube una portada nueva
        if ($request->hasFile('portada')) {
            $portadaPath = $request->file('portada')->store('empresa/Portadas', 'public');
            $empresa->portada_url = $portadaPath;
        }

        // Guardar la URL de YouTube (simple texto)
        if ($request->filled('video_pres_url')) {
            $empresa->video_pres_url = $request->video_pres_url;
        }

        // Actualizar otros campos normales
        $empresa->fill($request->except(['logo', 'portada', 'video_pres_url']));
        $empresa->save();

        return response()->json(['message' => 'Empresa actualizada correctamente.']);
    }
}
