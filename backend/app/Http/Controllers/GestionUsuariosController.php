<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;                   // se importa el modelo de la tabla
use Illuminate\Support\Facades\Hash;       // se importa la clase Hash para encriptar
use Illuminate\Support\Facades\Mail;       // importamos la clase Mail para mandar el email
use App\Mail\EnviarCorreoCredenciales;     // se importa el modelo del envio del correo de credenciales

class GestionUsuariosController extends Controller
{
    // metodo para añadir un nuevo usuario a la base de datos
    public function add(Request $request){

        // Crear el nuevo usuario
        $usuario = Usuarios::create([
            'nombreCompleto' => $request->input("nombreCompleto"),
            'nombreUsuario' => $request->input("usuario"),
            'email' => $request->input("email"),
            'password' => Hash::make($request->input("password")),  // se encripta la contraseña
            'terceros' => $request->input("terceros"),
        ]);

        // enviamos las credenciales de acceso al usuario a su direccion de email
        Mail::to($request->input("email"))->send(new EnviarCorreoCredenciales($request->input("nombreCompleto"), $request->input("usuario"), $request->input("password")));

        return response()->json(['message' => 'Usuario creado correctamente', 'usuario' => $usuario], 201);
    }

    // metodo para obtener todos los nombre de usuarios (comprobar si el nombre de usuario existe)
    public function obtenerNombresUsuarios(){

        $nombres = Usuarios::pluck('nombreUsuario'); // devuelve una colección con solo los nombres de usuario

        return response()->json($nombres);
    }

    // metodo para obtener todos los nombre de usuarios (comprobar si el nombre de usuario existe)
    public function obtenerIdsUsuarios() {

        $ids = Usuarios::pluck('id'); // devuelve una colección con solo los ids de los usuario

        return response()->json($ids);
    }

    // metodo para verificar las credenciales del login del usuario (request tendra user y pass)
    public function verificarCredenciales(Request $request) {

        $user = Usuarios::where("nombreUsuario", $request->input("user"))->first(); // buscamos el usuario con ese nombre

        // si no existe el usuario que mande un mensaje
        if (!$user) {
            return response()->json(["mensajeError" => "No esta ese nombre de usuario registrado."], 200);
        }

        // si la contrasela introducida no coincide con la registra en la base de datos
        if (!Hash::check($request->input("pass"), $user->password)) {
            return response()->json(["mensajeError" => "Contraseña incorrecta."], 200);
        }

        // si todo sale bien que devuelva los datos de ese usuario
        return response()->json([
            'id' => $user->id,
            'nombreCompleto' => $user->nombreCompleto,
            'nombreUsuario' => $user->nombreUsuario,
            'email' => $user->email,
            'terceros' => $user->terceros
        ], 200);
    }
}