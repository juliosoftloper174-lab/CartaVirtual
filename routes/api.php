<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\CuponController;
use App\Http\Controllers\PoliticasController;
use App\Http\Controllers\TerminosController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\RecursoEmpresaController;

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
Route::put('/empresa/{id}', [EmpresaController::class, 'update']);


// ================== ADMINISTRADOR ==================
Route::get('/administrador', [AdministradorController::class,'show']);
Route::post('/administrador/login', [AdministradorController::class,'login']);
Route::put('/administrador/update', [AdministradorController::class,'update']);

// obtener los recursos actuales
Route::get('/recursos-empresa', [RecursoEmpresaController::class, 'show']);

// crear o actualizar automáticamente (mantiene la misma ID)
Route::post('/recursos-empresa', [RecursoEmpresaController::class, 'store']);

// actualizar por ID (opcional, si quieres hacerlo por ID manualmente)
Route::post('/recursos-empresa/{id}', [RecursoEmpresaController::class, 'update']);




// ================== RUTA RAIZ ==================
Route::get('/', function() {
    return response()->json(['message' => 'API funcionando']);
});

