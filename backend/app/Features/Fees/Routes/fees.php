<?php

use Illuminate\Support\Facades\Route;
use App\Features\Fees\Controllers\FeeStructureController;

Route::prefix('admin')->middleware(['bearer', 'role:super_admin,school_admin,finance_officer'])->group(function () {
    Route::get('fee-structures', [FeeStructureController::class, 'index']);
});
