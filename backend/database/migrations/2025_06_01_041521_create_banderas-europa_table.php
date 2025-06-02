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
        // creamos la tabla con todas las preguntas para EuroBanderas
        Schema::create('banderas-europa', function (Blueprint $table) {
            $table->id();
            $table->string("url");
            $table->string("correct");
            $table->string("opcion1");
            $table->string("opcion2");
            $table->string("opcion3");
            $table->string("opcion4");
        });

        // creamos la tabla para guardar la puntuacion de los usuarios
        // creamos la tabla con todas las preguntas para EuroBanderas
        Schema::create('banderas-europa-puntuacion', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("usuario_id")->unique(); // FK
            //onDelete("cascade") permite que al eliminar un usuario se elimine también su puntuacion.
            $table->foreign("usuario_id")->references("id")->on("usuarios")->onDelete("cascade");

            $table->integer("aciertos");
            $table->integer("fallos");
            $table->integer("preguntas_saltadas");
            $table->integer("puntos");
            $table->integer("tiempo");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banderas-europa');
        Schema::dropIfExists('banderas-europa-puntuacion');
    }
};
