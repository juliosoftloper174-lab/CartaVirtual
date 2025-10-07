<?php

namespace App\Http\Controllers;

use App\Models\RecursoEmpresa;
use Illuminate\Http\Request;

class RecursoEmpresaController extends Controller
{
    // ==============================
    // Mostrar recursos (solo el primero)
    // ==============================
    public function show()
    {
        $recurso = RecursoEmpresa::first();

        if (!$recurso) {
            return response()->json(['message' => 'No hay recursos registrados.'], 404);
        }

        return response()->json($recurso);
    }

    // ==============================
    // Crear o actualizar automáticamente
    // ==============================
    public function store(Request $request)
    {
        // Si se manda _method=PUT, Laravel lo trata como PUT
        if ($request->_method === 'PUT') {
            return $this->updateAuto($request);
        }

        $request->validate([
            'logo_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'portada_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
        ]);

        $rutaCarpeta = public_path('images/empresa');
        if (!file_exists($rutaCarpeta)) mkdir($rutaCarpeta, 0777, true);

        $recurso = RecursoEmpresa::first() ?? new RecursoEmpresa();

        // Subir LOGO
        if ($request->hasFile('logo_url')) {
            if ($recurso->logo_url && file_exists(public_path($recurso->logo_url))) {
                unlink(public_path($recurso->logo_url));
            }
            $logoName = 'logo_' . time() . '_' . $request->file('logo_url')->getClientOriginalName();
            $request->file('logo_url')->move($rutaCarpeta, $logoName);
            $recurso->logo_url = 'images/empresa/' . $logoName;
        }

        // Subir PORTADA
        if ($request->hasFile('portada_url')) {
            if ($recurso->portada_url && file_exists(public_path($recurso->portada_url))) {
                unlink(public_path($recurso->portada_url));
            }
            $portadaName = 'portada_' . time() . '_' . $request->file('portada_url')->getClientOriginalName();
            $request->file('portada_url')->move($rutaCarpeta, $portadaName);
            $recurso->portada_url = 'images/empresa/' . $portadaName;
        }

        $recurso->save();

        return response()->json([
            'message' => $recurso->wasRecentlyCreated
                ? 'Recursos creados correctamente.'
                : 'Recursos actualizados correctamente.',
            'recurso' => $recurso
        ]);
    }

    // ==============================
    // Actualizar automáticamente (sin pasar ID)
    // ==============================
    public function updateAuto(Request $request)
    {
        $recurso = RecursoEmpresa::first();

        if (!$recurso) {
            return response()->json(['message' => 'No hay registro para actualizar.'], 404);
        }

        $request->validate([
            'logo_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'portada_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
        ]);

        $rutaCarpeta = public_path('images/empresa');
        if (!file_exists($rutaCarpeta)) mkdir($rutaCarpeta, 0777, true);

        // LOGO
        if ($request->hasFile('logo_url')) {
            if ($recurso->logo_url && file_exists(public_path($recurso->logo_url))) {
                unlink(public_path($recurso->logo_url));
            }
            $logoName = 'logo_' . time() . '_' . $request->file('logo_url')->getClientOriginalName();
            $request->file('logo_url')->move($rutaCarpeta, $logoName);
            $recurso->logo_url = 'images/empresa/' . $logoName;
        }

        // PORTADA
        if ($request->hasFile('portada_url')) {
            if ($recurso->portada_url && file_exists(public_path($recurso->portada_url))) {
                unlink(public_path($recurso->portada_url));
            }
            $portadaName = 'portada_' . time() . '_' . $request->file('portada_url')->getClientOriginalName();
            $request->file('portada_url')->move($rutaCarpeta, $portadaName);
            $recurso->portada_url = 'images/empresa/' . $portadaName;
        }

        $recurso->save();

        return response()->json([
            'message' => 'Recursos actualizados correctamente.',
            'recurso' => $recurso
        ]);
    }

    // ==============================
    // Actualizar por ID explícitamente
    // ==============================
    public function update(Request $request, $id)
    {
        $recurso = RecursoEmpresa::find($id);

        if (!$recurso) {
            return response()->json(['message' => 'Registro no encontrado.'], 404);
        }

        $request->validate([
            'logo_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'portada_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
        ]);

        $rutaCarpeta = public_path('images/empresa');
        if (!file_exists($rutaCarpeta)) mkdir($rutaCarpeta, 0777, true);

        // LOGO
        if ($request->hasFile('logo_url')) {
            if ($recurso->logo_url && file_exists(public_path($recurso->logo_url))) {
                unlink(public_path($recurso->logo_url));
            }
            $logoName = 'logo_' . time() . '_' . $request->file('logo_url')->getClientOriginalName();
            $request->file('logo_url')->move($rutaCarpeta, $logoName);
            $recurso->logo_url = 'images/empresa/' . $logoName;
        }

        // PORTADA
        if ($request->hasFile('portada_url')) {
            if ($recurso->portada_url && file_exists(public_path($recurso->portada_url))) {
                unlink(public_path($recurso->portada_url));
            }
            $portadaName = 'portada_' . time() . '_' . $request->file('portada_url')->getClientOriginalName();
            $request->file('portada_url')->move($rutaCarpeta, $portadaName);
            $recurso->portada_url = 'images/empresa/' . $portadaName;
        }

        $recurso->save();

        return response()->json([
            'message' => 'Recursos actualizados correctamente.',
            'recurso' => $recurso
        ]);
    }
}
