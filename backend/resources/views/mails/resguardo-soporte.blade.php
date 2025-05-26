<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Resguardo Soporte</title>
    </head>
    <body>
        <h1>RESGUARDO DE SOLICITUD #{{ $numSolicitud }}</h1>

        <p style="margin-top:15px">
            Se le manda en este correo un resguardo de su solicitud en la sección de soporte, no borre el correo hasta que le respondamos.
        </p>

        <br>

        <p style="font-family:monospace;">
            {!! nl2br($contenido) !!}
        </p>

        <br>

        <p>Atentamente, el equipo técnico de Let's Kody.</p>
    </body>
</html>