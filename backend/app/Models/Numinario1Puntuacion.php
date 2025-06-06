<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Usuarios;      // se importa el modelo de la tabla usuarios

class Numinario1Puntuacion extends Model
{
    protected $table = 'numinario1-puntuacion';
    protected $primaryKey = "id";          // clave primaria de la tabla

    public $timestamps = false;      // desactivamos los timestamps automaticos de Laravel

    // funcion para comprobar si el campo 'usuario_id' coincide con el 'id' de la tabla usuarios
    public function usuario()
    {
        return $this->belongsTo(Usuarios::class, 'usuario_id');  // cuando se usa es equivalente a SELECT * FROM usuarios WHERE id = usuario_id
    }

    protected $fillable = ['usuario_id','puntos','tiempo'];  // campos asignados en masa (con metodos create y update)
}
