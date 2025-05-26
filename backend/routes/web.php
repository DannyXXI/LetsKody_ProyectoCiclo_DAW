<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailSoporteController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/email/soporte' , [EmailSoporteController::class , "crear"]); // ruta para envio de emails de soporte