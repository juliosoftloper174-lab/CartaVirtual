<?php

namespace App\Http\Controllers;

use App\Models\Cupon;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CuponController extends Controller
{
    // Método para mostrar todos los cupones
    public function index()
    {
        $cupones = Cupon::all();
        return response()->json($cupones);
    }

    // Método para crear un cupon nuevo
    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required|string|unique:cupon,codigo',
            'descripcion' => 'nullable|string|max:200',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'estado' => 'required|boolean',
        ]);

        $cupon = Cupon::create($request->all());
        return response()->json($cupon, 201);
    }

    // Método para mostrar un cupon especifico
    public function show($id_cupon)
    {
        $cupon = Cupon::find($id_cupon);

        if (!$cupon) {
            return response()->json(['message' => 'Cupón no encontrado.'],404);
        }

        return response()->json($cupon);
    }

    // Método para actualizar un cupon
    public function update(Request $request, $id_cupon)
    {
        $cupon = Cupon::find($id_cupon);
        if (!$cupon) {
            return response()->json(['message' => 'Cupón no encontrado.'],404);
        }

        $request->validate([
            'codigo' => 'sometimes|required|string|unique:cupon,codigo,'.$cupon->id_cupon.',id_cupon',
            'descripcion' => 'nullable|string|max:200',
            'fecha_inicio' => 'sometimes|required|date',
            'fecha_fin' => 'sometimes|required|date|after_or_equal:fecha_inicio',
            'estado' => 'sometimes|required|boolean',
        ]);

        $cupon->update($request->all());
        return response()->json(['message' => 'Cupón actualizado correctamente.', 'cupon' => $cupon]);
    }

    // Método para eliminar un cupon
    public function destroy($id_cupon)
    {
        $cupon = Cupon::find($id_cupon);
        if (!$cupon) {
            return response()->json(['message' => 'Cupón no encontrado'],404);
        }
        $cupon->delete();
        return response()->json(['message' => 'Cupón eliminado correctamente.']);
    }

    // Método para verificar si un cupon es valido para la fecha actual
    public function verificarCupon(Request $request) {
        $request->validate([
            'codigo' => 'required|string',
        ]);

        $cupon = Cupon::where('codigo', $request->codigo)
        ->where('estado', 1)
        ->where('fecha_fin', '>=', Carbon::now())
        ->first();

        if (!$cupon) {
            return response()->json(['message' => 'Cupón inválido o expirado.'],404);
        }

        return response()->json($cupon);
    }
}
