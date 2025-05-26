<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailSoporte extends Model
{
    protected $table = "email_soporte";  // nombre de la tabla
    protected $primaryKey = "id";        // clave primaria de la tabla

    public $timestamps = true;           // habilita timestamps (para usar created_at automáticamente)
    const UPDATED_AT = null;             // desactiva el campo updated_at

    protected $fillable = ["destinatario" , "contenido" , "created_at" , "deleted_at"];  // campos asignados en masa (con metodos create y update)

    // Definir cómo se deben convertir los atributos al acceder a ellos
    protected $casts = [
        "id" => "integer",
        "destinatario" => "string",
        "contenido" => "string",
        "created_at" => "datetime",
        "deleted_at" => "datetime"
    ];
}
