<?php

use Illuminate\Support\Facades\Route;
use App\Features\Auth\Controllers\AuthController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('password/reset', [AuthController::class, 'requestPasswordReset']);

Route::middleware('bearer')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});
