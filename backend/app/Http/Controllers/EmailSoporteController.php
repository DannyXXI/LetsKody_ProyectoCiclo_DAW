<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;  // importamos la biblioteca Http para el reCAPTCHA
use App\Models\EmailSoporte;          // importamos el modelo de la base de datos
use Illuminate\Support\Facades\Mail;  // importamos la biblioteca Mail para mandar el email
use App\Mail\EnviarCorreoSoporte;     // importamos el modelo del envio de correo de soporte

class EmailSoporteController extends Controller
{
    // metodo para registrar la solicitud de soporte en BD y enviar resguardo
    public function crear(Request $request){

        // se realiza una solicitud POST al servidor de Google reCAPTCHA para verificar el token
        $responseCAPTCHA = Http::asForm() // enviamos los datos como formulario (application/x-www-form-urlencoded)
            ->withOptions([
                'verify' => false // verificar el certificado SSL (true para producción)
            ])
            ->post('https://www.google.com/recaptcha/api/siteverify', [  // URL de verificación del reCAPTCHA
                'secret' => env('RECAPTCHA_SECRET'),      // clave secreta del reCAPTCHA (dentro de .env)
                'response' => $request->input('token'),   // token que el frontend envió al completar el CAPTCHA
            ]);

        $body = $responseCAPTCHA->json(); // convertimos la respuesta JSON del servidor de Google en un array asociativo

        if ($body['success']) {
            // si el CAPTCHA fue válido, registramos la solicitud en la base de datos
            $correo = EmailSoporte::create([
                "destinatario" => $request->input('destinatario'),
                "contenido" => $request->input('contenido')
            ]);
            
            // luego enviamos el resguardo de la solicitud por correo electronico
            Mail::to($request->input('destinatario'))->send(new EnviarCorreoSoporte($request->input('contenido'), $correo->id));

            return response()->json($correo , 201); // devolvemos un JSON con el codigo de 201 OK
        } else {
            // si no fue válido, devolvemos un mensaje de error junto con los códigos de error proporcionados por Google
            return response()->json(['message' => '❌ CAPTCHA inválido', 'error-codes' => $body['error-codes']], 400);
        }
    }
}
