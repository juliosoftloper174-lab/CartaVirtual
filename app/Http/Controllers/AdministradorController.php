<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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

    // Método para actualizar los datos del administrador
    public function update(Request $request) {
        // Aquí validamos los datos de entrada. En donde el email debe ser único en la tabla "administrador"
        try {
            $request->validate([
                'nombre' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:administrador,email',
                'contrasena' => 'sometimes|string|min:6'
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        // Obtener el primer registro del administrador
        $admin = Administrador::first();
        if (!$admin) {
            return response()->json(['message' => 'Administrador no encontrado.'],404);
        }

        // Actualizar los campos si están presentes en la solicitud
        if ($request->has('nombre')) {
            $admin->nombre = $request->nombre;
        }

        if ($request->has('email')) {
            $admin->email = $request->email;
        }

        // Hashear la contraseña si se actualiza
        if ($request->has('contrasena')) {
            $admin->contrasena = Hash::make($request->contrasena);
        }

        $admin->save();
        return response()->json(['message' => 'Datos del administrador actualizados correctamente.']);
    }

    // Método para el inicio de sesión del administrador
    public function login(Request $request) {
        // 1. Aquí validamos los datos de entrada
        try {
            $request->validate([
                'email' => 'required|email',
                'contrasena' => 'required'
            ]);
        }  catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        // 2. Buscamos el administrador por su email
        $admin = Administrador::where('email', $request->email)->first();

        // 3. Verificamos si el administrador existe y si la contraseña es correcta
        if (!$admin || !Hash::check($request->contrasena, $admin->contrasena)) {
            return response()->json(['message' => 'Credenciales inválidas. Verifique el correo y la contraseña.'], 401);
        }

        // 4. Si todo es correcto, el inicio de sesión es exitoso
        return response()->json(['message' => 'Inicio de sesión exitoso.']);
    }
}
