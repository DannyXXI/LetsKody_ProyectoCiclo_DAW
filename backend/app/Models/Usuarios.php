<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    protected $table = "usuarios";  // nombre de la tabla
    protected $primaryKey = "id";        // clave primaria de la tabla

    // campos asignados en masa (con metodos create y update)
    protected $fillable = ["nombreCompleto" , "nombreUsuario" , "email" , "password" , "terceros" , "created_at" , "updated_at"];  

    // definir cómo se deben convertir los atributos al acceder a ellos
    protected $casts = [
        "id" => "integer",
        "nombreCompleto" => "string",
        "nombreUsuario" => "string",
        "email" => "string",
        "password" => "string",
        "terceros" => "boolean",
        "created_at" => "datetime",
        "updated_at" => "datetime"
    ];
}
