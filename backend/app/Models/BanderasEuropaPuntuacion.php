<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Usuarios;      // se importa el modelo de la tabla usuarios

class BanderasEuropaPuntuacion extends Model
{
    protected $table = 'banderas-europa-puntuacion';
    protected $primaryKey = "id";          // clave primaria de la tabla

    public $timestamps = false;      // desactivamos los timestamps automaticos de Laravel

    // funcion para comporbar si el campo 'usuario_id' coincide con el 'id' de la tabla usuarios
    public function usuario()
    {
        return $this->belongsTo(Usuarios::class, 'usuario_id');  // cuando se usa es equivalente a SELECT * FROM usuarios WHERE id = usuario_id
    }

    // campos asignados en masa (con metodos create y update)
    protected $fillable = ['usuario_id','aciertos','fallos','preguntas_saltadas','puntos','tiempo'];
}
