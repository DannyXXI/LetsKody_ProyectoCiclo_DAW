<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;  // importamos la clase Http para el reCAPTCHA

class RecaptchaController extends Controller
{
    // metodo para verificar el token del reCAPTCHA
    public function verificar(Request $request) {

        $token = $request->input("token"); // obtengo el token enviado por el frontend
    
        if (!$token) {
            return response()->json(["mensaje" => "⚠️ Token no proporcionado"], 422); // si no hay token que devuelva un mensaje
        }
    
        // se realiza una solicitud POST al servidor de Google reCAPTCHA para verificar el token
        $resultadoCAPTCHA = Http::asForm() // enviamos los datos como formulario (application/x-www-form-urlencoded)
            ->withOptions([
                "verify" => false // verificar el certificado SSL (true para producción)
            ])
            ->post("https://www.google.com/recaptcha/api/siteverify", [  // URL del servidor de Google para verificar el reCAPTCHA
                "secret" => env('RECAPTCHA_SECRET'),      // clave secreta (dentro de .env)
                "response" => $token,                     // token que el frontend envió
            ]);

        $body = $resultadoCAPTCHA->json(); // convertimos la respuesta JSON del servidor de Google en un array asociativo

        if ($body["success"]) {
            return response()->json(["mensaje" => "✅ CAPTCHA válido"] , 201); // si fue válido, devolvemos un JSON con el codigo de 201 OK
        } else {
            // si no fue válido, devolvemos un mensaje de error junto con los códigos de error proporcionados por Google
            return response()->json(["mensaje" => "❌ CAPTCHA inválido", "error-codes" => $body["error-codes"]], 400);
        }
    }
}
