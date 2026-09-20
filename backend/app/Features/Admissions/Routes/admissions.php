<?php

use Illuminate\Support\Facades\Route;
use App\Features\Admissions\Controllers\ApplicationController;
use App\Features\Admissions\Controllers\TourController;

// Public
Route::post('applications', [ApplicationController::class, 'store']);
Route::get('applications/track', [ApplicationController::class, 'track']);
Route::post('tours', [TourController::class, 'store']);

// Protected
Route::middleware(['bearer', 'role:super_admin,school_admin,admissions_officer'])->group(function () {
    Route::get('applications', [ApplicationController::class, 'index']);
    Route::get('applications/{id}', [ApplicationController::class, 'show']);
    Route::patch('applications/{id}', [ApplicationController::class, 'update']);
    Route::post('applications/{id}/documents', [ApplicationController::class, 'uploadDocument']);
    Route::get('applications/{id}/documents', [ApplicationController::class, 'documents']);
    Route::patch('applications/{id}/status', [ApplicationController::class, 'updateStatus']);
    Route::get('tours/{id}', [TourController::class, 'show']);
    Route::patch('tours/{id}', [TourController::class, 'update']);
});
