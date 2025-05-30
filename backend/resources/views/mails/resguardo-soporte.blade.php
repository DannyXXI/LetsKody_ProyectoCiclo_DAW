<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>¡Tu mensaje secreto ha sido recibido! 🧙‍♂️</title>
</head>
<body style="background-color: #eaf7ff; font-family: 'Comic Sans MS', cursive, sans-serif; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
        
        <img src="{{ $message->embed(public_path('img/kody.png')) }}" alt="Kody" style="max-width: 180px">

        <h1 style="color: #0077cc;">¡Resguardo de tu solicitud mágica!</h1>
        <h3 style="color: #555;">N° de solicitud: <span style="color: #005ea1;">{{ $numSolicitud }}</span></h3>

        <p style="font-size: 16px; margin-top: 20px;">
            Hemos recibido tu mensaje en la torre de soporte técnico. ¡Nuestro equipo de magos y robots lo leera con mucha atención!
        </p>

        <p style="font-size: 16px; color: #444; margin: 20px 0;">
            Guarda este correo como si fuera un mapa del tesoro ya que lo necesitaremos cuando volvamos a hablar contigo.
        </p>

        <div style="text-align: left; background-color: #f0fff4; border: 2px dashed #00c853; padding: 20px; border-radius: 12px; font-family: monospace; white-space: pre-wrap;">
            {!! nl2br($contenido) !!}
        </div>

        <p style="margin-top: 30px;">Te responderemos lo más rápido posible con polvo de estrellas.</p>

        <p style="margin-top: 20px; font-size: 14px; color: #666;">
            Con cariño, el equipo de ayuda mágica de <strong>Let's Kody</strong>.
        </p>
    </div>
</body>
</html>