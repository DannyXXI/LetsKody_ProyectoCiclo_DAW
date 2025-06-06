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
        // creamos la tabla para guardar la puntuacion de los usuarios
        Schema::create('numinario1-puntuacion', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("usuario_id")->unique(); // FK
            //onDelete("cascade") permite que al eliminar un usuario se elimine también su puntuacion.
            $table->foreign("usuario_id")->references("id")->on("usuarios")->onDelete("cascade");

            $table->integer("puntos");
            $table->integer("tiempo");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('numinario1');
    }
};
