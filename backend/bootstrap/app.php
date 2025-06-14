<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // evitamos el uso del token CSRF para el POST, PUT y DELETE
        $middleware->validateCsrfTokens(except: [
            "email/*",
            "recaptcha",
            "usuario/*",
            "geografia/*",
            "matematicas/*",
            "ranking/usuario/*"
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
