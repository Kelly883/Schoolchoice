<?php

use Illuminate\Support\Facades\Route;
use App\Features\Parents\Controllers\ParentController;

Route::prefix('parent')->middleware(['bearer', 'role:parent'])->group(function () {
    Route::get('children', [ParentController::class, 'index']);
});
