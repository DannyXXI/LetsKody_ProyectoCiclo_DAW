<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BanderasEuropa extends Model
{
    protected $table = "banderas-europa";  // nombre de la tabla
    protected $primaryKey = "id";          // clave primaria de la tabla

    // campos asignados en masa (con metodos create y update)
    protected $fillable = ["url" , "correct" , "opcion1" , "opcion2" , "opcion3" , "opcion4"];  

    // definir cómo se deben convertir los atributos al acceder a ellos
    protected $casts = [
        "id" => "integer",
        "url" => "string",
        "correct" => "string",
        "opcion1" => "string",
        "opcion2" => "string",
        "opcion3" => "string",
        "opcion4" => "string"
    ];
}