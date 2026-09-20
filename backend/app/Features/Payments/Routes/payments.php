<?php

use Illuminate\Support\Facades\Route;
use App\Features\Payments\Controllers\PaystackController;
use App\Features\Payments\Controllers\FlutterwaveController;

// Webhooks (public)
Route::post('paystack/webhook', [PaystackController::class, 'webhook']);
Route::post('flutterwave/webhook', [FlutterwaveController::class, 'webhook']);

// Protected
Route::middleware('bearer')->group(function () {
    Route::post('paystack/initialize', [PaystackController::class, 'initialize']);
    Route::post('paystack/verify', [PaystackController::class, 'verify']);
    Route::post('flutterwave/initialize', [FlutterwaveController::class, 'initialize']);
    Route::post('flutterwave/verify', [FlutterwaveController::class, 'verify']);
});
