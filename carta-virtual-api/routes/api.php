<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PedidoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí puedes registrar tus rutas de API. Estas rutas se cargan
| mediante RouteServiceProvider y tienen el middleware "api".
|
*/

// Ruta por defecto de Sanctum (opcional)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas de productos
Route::get('/productos', [ProductController::class, 'index']);       // Obtener todos los productos
Route::get('/productos/{id}', [ProductController::class, 'show']);  // Obtener un producto por id

// Rutas de categorías
Route::get('/categorias', [CategoryController::class, 'index']);    // Obtener todas las categorías

// Rutas de pedidos
Route::post('/pedidos', [PedidoController::class, 'store']);         // Crear un pedido
