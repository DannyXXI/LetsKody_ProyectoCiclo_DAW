<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Actualización de acceso</title>
    </head>
    <body style="background-color: #eaf7ff; font-family: 'Comic Sans MS', cursive, sans-serif; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
            
            <img src="{{ $message->embed(public_path('img/kody_welcome.png')) }}" alt="Kody te da la bienvenida" style="max-width: 250px; margin-bottom: 10px;">

            <h2 style="color: #0077cc;">¡Hola de nuevo, {{ $name }}!</h2>

            <p style="font-size: 16px;">
                Kody ha actualizado tus llaves mágicas para que sigas navegando con alegría por nuestro mundo de juegos y aprendizajes.
            </p>

            <div style="margin-top: 20px; text-align: left; background-color: #f0faff; padding: 20px; border-radius: 12px; font-size: 16px; line-height: 1.6;">
                <strong>👤 Nombre de usuario:</strong> <span style="color: #0077cc;">{{ $user }}</span><br>
                <strong>🔐 Contraseña:</strong> <span style="color: #0077cc;">{{ $pass }}</span>
            </div>

            <p style="margin-top: 20px;">Guárdalas en tu mochila mágica y úsalas para seguir explorando sin límites.</p>

            <a href="http://localhost:4200/" style="display: inline-block; margin-top: 10px; padding: 12px 24px; background-color: #57a3fb; color: rgb(0, 0, 0); text-decoration: none; border-radius: 8px; font-size: 16px;">
                ¡Volver al portal encantado!
            </a>

            <p style="font-size: 12px; color: #777; margin-top: 30px;">
                Si no solicitaste este cambio, tal vez un hada traviesa haya tocado los botones... ¡todo está bajo control!
            </p>
        </div>
    </body>
</html>