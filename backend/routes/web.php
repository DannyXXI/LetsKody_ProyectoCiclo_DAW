<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailSoporteController;
use App\Http\Controllers\RecaptchaController;
use App\Http\Controllers\EmailValidacionController;
use App\Http\Controllers\GestionUsuariosController;
use App\Http\Controllers\BanderasEuropeasController;
use App\Http\Controllers\Numinario1Controller;
use App\Http\Controllers\RankingController;

// ruta para la página de inicio
Route::get('/', function () { return view('welcome'); });

// ruta para envio de emails de soporte
Route::post('/email/soporte' , [EmailSoporteController::class , "crear"]); 

// ruta para envio de emails de verificación
Route::post('/email/verificacion' , [EmailValidacionController::class , "enviarRegistro"]);

// ruta para envio de emails de verificacion
Route::post('/email/verificacion-update' , [EmailValidacionController::class , "enviarModificacion"]); 

// ruta para tratar la verificiación del reCAPTCHA
Route::post('/recaptcha', [RecaptchaController::class , "verificar"]); 

// ruta para añadir un usuario a la base de datos
Route::post('/usuario/crear' , [GestionUsuariosController::class , "add"]); 

// ruta para obtener todos los nombres de usuarios
Route::get('/usuario/nombres' , [GestionUsuariosController::class , "obtenerNombresUsuarios"]); 

// ruta para obtener todos los ids de los usuarios
Route::get('/usuario/ids' , [GestionUsuariosController::class , "obtenerIdsUsuarios"]); 

// ruta para comprobar las credenciales para hacer login
Route::post('/usuario/login' , [GestionUsuariosController::class , "verificarCredenciales"]); 

// ruta para actualizar parcialmente los datos del usuario en la base de datos
Route::patch('/usuario/modificar' , [GestionUsuariosController::class , "update"]); 

// ruta para eliminar un usuario por su id
Route::delete("/usuario/eliminar/{id}" , [GestionUsuariosController::class , "delete"]); 

// ruta para obtener todos los datos de las banderas
Route::get('/geografia/eurobanderas' , [BanderasEuropeasController::class , "obtenerBanderas"]); 

// ruta para guardar/modificar la puntuacion del usuario en el juego de las banderas
Route::post('/geografia/eurobanderas/puntuacion' , [BanderasEuropeasController::class , "guardarPuntuacion"]); 

// ruta para guardar/modificar la puntuacion del usuario en el juego del numinario
Route::post("/matematicas/numinario1/puntuacion", [Numinario1Controller::class , "guardarPuntuacion"]);

// ruta para obtener las puntuaciones y posiciones de un jugador en todos los juegos
Route::get("/ranking/usuario/{id}" , [RankingController::class , "obtenerRankingPorUsuario"]);