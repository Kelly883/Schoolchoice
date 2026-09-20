<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return response()->json(['message' => 'School Digital Platform API']);
});
