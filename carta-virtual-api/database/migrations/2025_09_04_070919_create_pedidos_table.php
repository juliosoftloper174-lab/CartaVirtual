<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('pedidos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('usuarios')->onDelete('cascade');
        $table->decimal('total', 10, 2);
        $table->enum('metodo_pago', ['efectivo', 'tarjeta', 'yape', 'plin']);
        $table->enum('tipo_entrega', ['domicilio', 'local']);
        $table->string('direccion')->nullable();
        $table->string('mesa')->nullable();
        $table->text('observaciones')->nullable();
        $table->enum('estado', ['creado', 'confirmado', 'enviado', 'entregado'])->default('creado');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
