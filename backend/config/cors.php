<?php
    // archivo para habilitar las CORS en Laravel (se crea manualmente)

    return [
        'paths' => ["email/*", "recaptcha", "usuario/*", "geografia/*", "matematicas/*", "ranking/usuario/*"], // rutas que quieres habilitar el CORS
        'allowed_methods' => ['*'], // permitir todos los métodos
        'allowed_origins' => ['*'], // permitir solicitudes de cualquier origen
        'allowed_origins_patterns' => [],
        'allowed_headers' => ['*'], // permitir todos los encabezados
        'exposed_headers' => [],
        'max_age' => 0,
        'supports_credentials' => false, // Cambiar a true si usas autenticación con cookies
    ];
?>