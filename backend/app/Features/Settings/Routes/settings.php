<?php

use Illuminate\Support\Facades\Route;
use App\Features\Settings\Controllers\DashboardController;

Route::prefix('admin')->middleware(['bearer', 'role:super_admin,school_admin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index']);
});
