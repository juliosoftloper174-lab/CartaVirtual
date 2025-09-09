<?php

use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\CuponController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PoliticasController;
use App\Http\Controllers\TerminosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ProductoController;

// Ruta para obtener los datos de la empresa
Route::get('/empresa', [EmpresaController::class,'show']);

// Ruta para actualizar los datos de la empresa
Route::put('/empresa/update', [EmpresaController::class, 'update']);

// Ruta para eliminar la portada de la empresa
Route::put('/empresa/eliminar-portada', [EmpresaController::class,'eliminarPortada']);

// Ruta para eliminar el logo de la empresa
Route::put('/empresa/eliminar-logo', [EmpresaController::class,'eliminarLogo']);

// Rutas para la tabla "categoria"
Route::apiResource('categoria', CategoriaController::class);

// Rutas para la tabla "producto"
Route::apiResource('producto', ProductoController::class);
Route::get('/categoria/{id_categoria}/producto', [ProductoController::class,'obtenerPorCategoria']);

// Rutas para la tablas "terminos" y "politicas"
Route::get('/terminos', [TerminosController::class,'show']);
Route::put('/terminos', [TerminosController::class,'update']);

Route::get('/politicas', [PoliticasController::class,'show']);
Route::put('/politicas', [PoliticasController::class,'update']);

//Rutas para la tabla "cupon"
Route::post('/cupon/verificar', [CuponController::class,'verificarCupon']);
Route::apiResource('cupon', CuponController::class);

// Ruta para la tabla "administrador"
Route::get('/administrador', [AdministradorController::class,'show']);

// Ruta para los pedidos
Route::apiResource('pedidos', PedidoController::class);
