<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;       // importamos la clase Mail para mandar el email
use App\Mail\EnviarCorreoVerificacion;     // importamos el modelo del envio de correo de verificacion

class EmailValidacionController extends Controller
{
    // metodo para enviar el correo de verificacion al nuevo usuario
    public function enviar(Request $request){

        $destinatario = $request->input("email");  // obtengo la dirección email del destinatario
        $codigo = $request->input("codigo");       // obtengo el codigo de verificacion
    
        if (!$destinatario) {
            return response()->json(["mensaje" => "⚠️ Email del destinatario no proporcionado"], 422); // si no hay email que devuelva un mensaje
        }
        else if (!$codigo) {
            return response()->json(["mensaje" => "⚠️ Codigo de verificacón no proporcionado"], 422); // si no hay codigo que devuelva un mensaje
        }
        else {
            // enviamos el codigo de verificacion por email al usuario
            Mail::to($destinatario)->send(new EnviarCorreoVerificacion($codigo));

            return response()->json(["mensaje" => "📧 Email enviado correctamente"], 201); // devolvemos un mensaje con el codigo de 201 OK
        }
    }
}
