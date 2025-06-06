<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;                    // se importa el modelo de la tabla usuarios
use App\Models\Numinario1Puntuacion;                    // se importa el modelo de la de la puntuacion en el numinario 1

class Numinario1Controller extends Controller
{
    // metodo para guardar la puntuacion realizada en el juego del numinario o modificarla si es mas alta
    public function guardarPuntuacion(Request $request){

        $usuario = Usuarios::find($request->usuario_id); // buscamos al usuario por su ID

        // si no existe el usuario que devuelva un mensaje de error
        if(!$usuario){
            return response()->json(["mensaje" => "❌​ El usuario con ID " . $request->usuario_id . " no existe.", 42]);
        }

        // almacenamos las dos puntuaciones (antigua y nueva) en sus respectivas variables
        $puntuacionExistente = $usuario->puntuacionNuminario1()->first();;
        $nuevaPuntuacion = (int) $request->puntos;



        if ($puntuacionExistente){
            // si existe una puntuacion y la nueva es mejor, se actualiza
            if ($nuevaPuntuacion > $puntuacionExistente->puntos) {
                $puntuacionExistente->update([
                    'puntos' => $nuevaPuntuacion,
                    'tiempo' => $request->tiempo
                ]);
            }
        }
        else{
            // si no hay puntuación previa, la creamos
            Numinario1Puntuacion::create([
                'usuario_id' => $usuario->id,
                'puntos' => $nuevaPuntuacion,
                'tiempo' => $request->tiempo
            ]);
        }

        return response()->json(["mensaje" => "✅​​ Proceso realizado sin problema."]);
    }
}
