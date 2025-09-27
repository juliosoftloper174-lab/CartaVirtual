<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarritoController;

Route::get('/carrito', [CarritoController::class, 'index']);
Route::post('/carrito', [CarritoController::class, 'store']);
Route::put('/carrito/{id_producto}', [CarritoController::class, 'update']);
Route::delete('/carrito/{id_producto}', [CarritoController::class, 'destroy']);
Route::delete('/carrito', [CarritoController::class, 'clear']);
Route::post('/carrito/confirmar', [CarritoController::class, 'confirmarCompra']); // Nueva ruta para confirmar compra