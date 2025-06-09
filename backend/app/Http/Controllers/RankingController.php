<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;                      // se importa el modelo de la tabla usuarios
use App\Models\BanderasEuropaPuntuacion;      // importamos el modelo de la tabla de la puntuacion en la banderas
use App\Models\Numinario1Puntuacion;          // se importa el modelo de la de la puntuacion en el numinario 1

class RankingController extends Controller
{
    // método para obtener la puntuacion de todos los juegos del usuario y su posicion en el ranking en cada uno
    public function obtenerRankingPorUsuario($id) {

        $usuario = Usuarios::find($id);  // buscamos al usuario por su ID

        // si no existe el usuario que devuelva un mensaje de error
        if(!$usuario){
            return response()->json(["mensaje" => "❌​ El usuario con ID " . $id . " no existe."],404);
        }

        // inicializamos el resultado con la estructura deseada
        $resultado = ["hayPuntuacion" => false, "puntuaciones" => [], "mensaje" => ""];


        // ------------------- JUEGO 1: Euro-Banderas -------------------


        // obtenemos las puntuaciones del juego Euro-Banderas por mayor puntuacion y menor tiempo de todos los usuarios
        $puntuacionesBanderas = BanderasEuropaPuntuacion::orderByDesc('puntos')->orderBy('tiempo')->get();

        $posicionBanderas = 1;  // inicializamos la variable para buscar la posicion del jugador en Euro-Banderas

        // recorremos en un array cada fila para encontrar algún registro del usuario
        foreach ($puntuacionesBanderas as $puntuacion) {
            // si el id del usuario coincide con el campo 'usuario_id' se registra sus datos y posicion en el array de puntuaciones
            if ($puntuacion->usuario_id == $id) {
                $resultado['puntuaciones'][] = [
                    'nombre' => 'Euro-Banderas',
                    'puesto' => $posicionBanderas . "º",
                    'puntos' => $puntuacion->puntos,
                    'tiempo' => $puntuacion->tiempo
                ];
                break; // tras registrar los datos se sale del bucle
            }
            $posicionBanderas++; // se incrementa la posicion si el usuario no esta en esa posicion
        }


        // ------------------- JUEGO 2: Numinario I -------------------


        // obtenemos las puntuaciones del juego Numinario I por mayor puntuacion y menor tiempo de todos los usuarios
        $puntuacionesNuminario = Numinario1Puntuacion::orderByDesc('puntos')->orderBy('tiempo')->get();

        $posicionNuminario = 1;  // inicializamos la variable para buscar la posicion del jugador en Numinario I

        // recorremos en un array cada fila para encontrar algún registro del usuario
        foreach ($puntuacionesNuminario as $puntuacion) {
            // si el id del usuario coincide con el campo 'usuario_id' se registra sus datos y posicion en el array de puntuaciones
            if ($puntuacion->usuario_id == $id) {
                $resultado['puntuaciones'][] = [
                    'nombre' => 'Numinario I',
                    'puesto' => $posicionNuminario . 'º',
                    'puntos' => $puntuacion->puntos,
                    'tiempo' => $puntuacion->tiempo
                ];
                break;  // tras registrar los datos se sale del bucle
            }
            $posicionNuminario++;  // se incrementa la posicion si el usuario no esta en esa posicion
        }


        // ------------------- SE COMPLETAN LOS OTROS CAMPOS -------------------


        // indicamos si el usuario tiene alguna puntuación registrada
        if(count($resultado['puntuaciones']) > 0) {
            $resultado['hayPuntuacion'] = true;
            $resultado["mensaje"] = "✅​ Se obtuvo sin problemas las puntuaciones del usuario con ID " . $id . ".";
        }
        else {
            $resultado["mensaje"] = "⚠️​​ El usuario con ID " . $id . " no tiene ninguna puntuación registrada.";
        } 

        return response()->json($resultado, 200);  // se devuelve el array como JSON al frontend
    }
}
