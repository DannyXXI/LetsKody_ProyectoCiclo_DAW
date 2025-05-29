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
}