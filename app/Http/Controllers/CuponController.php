<?php

namespace App\Http\Controllers;

use App\Models\Cupon;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CuponController extends Controller
{
    // 🔹 Mostrar todos los cupones
    public function index()
    {
        $cupones = Cupon::all();
        return response()->json($cupones);
    }

    // 🔹 Crear un nuevo cupón
    public function store(Request $request)
{
    $request->validate([
        'codigo' => 'required|string|unique:cupon,codigo',
        'tipo' => 'required|string|in:porcentaje,monto',
        'valor' => 'required|numeric|min:0',
        'id_categoria' => 'nullable|integer|exists:categoria,id_categoria',
        'id_producto' => 'nullable|integer|exists:producto,id_producto',
        'descripcion' => 'nullable|string|max:200',
        'fecha_inicio' => 'required|date',
        'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
        'estado' => 'required|boolean',
        'cantidad_total' => 'required|integer|min:1',
        'cantidad_usada' => 'nullable|integer|min:0',
    ]);

    $cupon = Cupon::create($request->all());

    return response()->json([
        'message' => '✅ Se ha creado un nuevo cupón exitosamente.',
        'cupon' => $cupon
    ], 201);
}


    // 🔹 Mostrar un cupón específico
    public function show($id_cupon)
    {
        $cupon = Cupon::find($id_cupon);

        if (!$cupon) {
            return response()->json(['message' => 'Cupón no encontrado.'], 404);
        }

        return response()->json($cupon);
    }

    // 🔹 Actualizar un cupón
    public function update(Request $request, $id_cupon)
    {
        $cupon = Cupon::find($id_cupon);
        if (!$cupon) {
            return response()->json(['message' => 'Cupón no encontrado.'], 404);
        }

        $request->validate([
            'codigo' => 'sometimes|required|string|unique:cupon,codigo,' . $cupon->id_cupon . ',id_cupon',
            'tipo' => 'sometimes|required|string|in:porcentaje,monto',
            'valor' => 'sometimes|required|numeric|min:0',
            'id_categoria' => 'nullable|integer|exists:categoria,id_categoria',
            'id_producto' => 'nullable|integer|exists:producto,id_producto',
            'descripcion' => 'nullable|string|max:200',
            'fecha_inicio' => 'sometimes|required|date',
            'fecha_fin' => 'sometimes|required|date|after_or_equal:fecha_inicio',
            'estado' => 'sometimes|required|boolean',
            'cantidad_total' => 'sometimes|required|integer|min:1',
            'cantidad_usada' => 'nullable|integer|min:0',
        ]);

        $cupon->update($request->all());
        return response()->json(['message' => 'Cupón actualizado correctamente.', 'cupon' => $cupon]);
    }

    // 🔹 Eliminar un cupón
    public function destroy($id_cupon)
    {
        $cupon = Cupon::find($id_cupon);
        if (!$cupon) {
            return response()->json(['message' => 'Cupón no encontrado.'], 404);
        }

        $cupon->delete();
        return response()->json(['message' => 'Cupón eliminado correctamente.']);
    }

    // 🔹 Verificar si un cupón es válido
    public function verificarCupon(Request $request)
    {
        $request->validate([
            'codigo' => 'required|string',
        ]);

        $cupon = Cupon::where('codigo', $request->codigo)
            ->where('estado', 1)
            ->where('fecha_inicio', '<=', Carbon::now())
            ->where('fecha_fin', '>=', Carbon::now())
            ->whereColumn('cantidad_usada', '<', 'cantidad_total')
            ->first();

        if (!$cupon) {
            return response()->json(['message' => 'Cupón inválido o expirado.'], 404);
        }

        return response()->json([
            'message' => 'Cupón válido.',
            'cupon' => $cupon
        ]);
    }
}
