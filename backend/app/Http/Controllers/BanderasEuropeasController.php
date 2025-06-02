<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BanderasEuropa;              // importamos el modelo de la tabla de las banderas
use App\Models\BanderasEuropaPuntuacion;    // importamos el modelo de la tabla de la puntuacion en la banderas
use App\Models\Usuarios;                    // se importa el modelo de la tabla usuarios

class BanderasEuropeasController extends Controller
{
    // metodo para obtener todos los datos de las banderas 
    public function obtenerBanderas(){

        $banderas =  BanderasEuropa::all();   // se obtiene todos los registros y todas las columnas

        return response()->json($banderas);
    }

    // metodo para guardar la puntuacion realizada en el juego de banderas o modificarla si es mas alta
    public function guardarPuntuacion(Request $request){

        $usuario = Usuarios::find($request->usuario_id); // buscamos al usuario por su ID

        // si no existe el usuario que devuelva un mensaje de error
        if(!$usuario){
            return response()->json(["mensaje" => "❌​ El usuario con ID " . $request->usuario_id . " no existe.", 42]);
        }

        // almacenamos las dos puntuaciones (antigua y nueva) en sus respectivas variables
        $puntuacionExistente = $usuario->puntuacionBanderasEuropa()->first();;
        $nuevaPuntuacion = (int) $request->puntos;



        if ($puntuacionExistente){
            // si existe una puntuacion y la nueva es mejor, se actualiza
            if ($nuevaPuntuacion > $puntuacionExistente->puntos) {
                $puntuacionExistente->update([
                    'aciertos' => $request->aciertos,
                    'fallos' => $request->fallos,
                    'preguntas_saltadas' => $request->preguntas_saltadas,
                    'puntos' => $nuevaPuntuacion,
                    'tiempo' => $request->tiempo,
                ]);
            }
        }
        else{
            // Si no hay puntuación previa, la creamos
            BanderasEuropaPuntuacion::create([
                'usuario_id' => $usuario->id,
                'aciertos' => $request->aciertos,
                'fallos' => $request->fallos,
                'preguntas_saltadas' => $request->preguntas_saltadas,
                'puntos' => $nuevaPuntuacion,
                'tiempo' => $request->tiempo,
            ]);
        }

        return response()->json(["mensaje" => "✅​​ Proceso realizo sin problema" . $request->usuario_id . " no existe."]);
    }
}