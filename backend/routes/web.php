<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'School Digital Platform API',
        'version' => '1.0.0',
        'documentation' => '/api/v1/health',
    ]);
});
