<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;                   // se importa el modelo de la tabla
use Illuminate\Support\Facades\Hash;       // se importa la clase Hash para encriptar
use Illuminate\Support\Facades\Mail;       // importamos la clase Mail para mandar el email
use App\Mail\EnviarCorreoCredenciales;     // se importa el modelo del envio del correo de credenciales
use App\Mail\EnviarCorreoNuevasCredenciales;     // se importa el modelo del envio del correo de credenciales modificadas

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

    // metodo para actualizar los datos del usuario en la base de datos
    public function update(Request $request){

        $usuario = Usuarios::find($request->input("id"));   // obtenemos el usuario por su ID

        // si no existe el usuario que se busca actualizar
        if (!$usuario) {
            return response()->json(["mensajeError" => "Usuario no encontrado."], 404);
        }

        // primero comprobamos si se ha enviado las contraseñas
        if( !empty($request->input("lastPass")) && !empty($request->input("newPass")) ) {

            // verificar si la contraseña anterior coincide con la del usuario para actualizarla con la nueva
            if (!Hash::check($request->input("lastPass"), $usuario->password)) {
                return response()->json(["mensajeError" => 'La contraseña anterior no corresponde con su contraseña actual.'], 200);
            }
            else {
                $usuario->password = Hash::make($request->input("newPass")); // se actualiza la contraseña con el valor encriptado
            }
        }

        // si el nombre de usuario viene vacio no se actualiza
        if( !empty($request->input("nombreUsuario")) ) {

            $usuario->nombreUsuario = $request->input("nombreUsuario");
        }

        // si la dirección de email viene vacia no se actualiza
        if( !empty($request->input("email")) ) {

            $usuario->email = $request->input("email");
        }
        
        $usuario->terceros = $request->input("terceros"); // se actualiza el campo de uso de datos a terceros
        
        $usuario->save(); // se guardan los cambios realizados

        // enviamos las credenciales de acceso al usuario a su direccion de email
        Mail::to($request->input("email"))->send(new EnviarCorreoNuevasCredenciales($request->input("nombreCompleto"), $request->input("nombreUsuario"), $request->input("newPass")));

        return response()->json(["mensajeCorrecto" => "Usuario actualizado correctamente."], 200);
    }
}