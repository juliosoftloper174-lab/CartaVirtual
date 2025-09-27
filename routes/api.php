<?php

use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\CuponController;
use App\Http\Controllers\PoliticasController;
use App\Http\Controllers\TerminosController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\AdministradorController;
use Illuminate\Support\Facades\Route;

// ================== CATEGORIA ==================
Route::apiResource('categorias', CategoriaController::class);

// ================== CUPON ==================
Route::post('/cupon/verificar', [CuponController::class,'verificarCupon']);
Route::apiResource('cupon', CuponController::class);

// ================== PRODUCTO ==================
Route::apiResource('producto', ProductoController::class);
Route::get('/categoria/{id_categoria}/producto', [ProductoController::class,'obtenerPorCategoria']);

// ================== TERMINOS Y POLITICAS ==================
Route::get('/terminos', [TerminosController::class,'show']);
Route::put('/terminos', [TerminosController::class,'update']);
Route::get('/politicas', [PoliticasController::class,'show']);
Route::put('/politicas', [PoliticasController::class,'update']);

// ================== EMPRESA ==================
Route::get('/empresa', [EmpresaController::class, 'show']);             
Route::put('/empresa/update', [EmpresaController::class, 'update']); 

// ================== ADMINISTRADOR ==================
Route::get('/administrador', [AdministradorController::class,'show']);
Route::post('/administrador/login', [AdministradorController::class,'login']);
Route::put('/administrador/update', [AdministradorController::class,'update']);


// ================== CARRITO (con session) ==================
Route::middleware(['web'])->group(function () {
    Route::get('/carrito', [CarritoController::class, 'index']);                 // Ver carrito
    Route::post('/carrito', [CarritoController::class, 'store']);                // Agregar producto
    Route::put('/carrito/{id_producto}', [CarritoController::class, 'update']);  // Actualizar cantidad
    Route::delete('/carrito/{id_producto}', [CarritoController::class, 'destroy']); // Eliminar producto
    Route::delete('/carrito', [CarritoController::class, 'clear']);              // Vaciar carrito
});

// ================== RUTA RAIZ ==================
Route::get('/', function() {
    return response()->json(['message' => 'API funcionando']);
});
