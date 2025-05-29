<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailSoporteController;
use App\Http\Controllers\RecaptchaController;
use App\Http\Controllers\EmailValidacionController;
use App\Http\Controllers\GestionUsuariosController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/email/soporte' , [EmailSoporteController::class , "crear"]); // ruta para envio de emails de soporte

Route::post('/recaptcha', [RecaptchaController::class , "verificar"]); // ruta para tratar la verificiación del reCAPTCHA

Route::post('/email/verificacion' , [EmailValidacionController::class , "enviar"]); // ruta para envio de emails de verificacion

Route::post('/usuario/crear' , [GestionUsuariosController::class , "add"]); // ruta para añadir un usuario a la base de datos

Route::get('/usuario/nombres' , [GestionUsuariosController::class , "obtenerNombresUsuarios"]); // ruta para obtener todos los nombres de usuarios