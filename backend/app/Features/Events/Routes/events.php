<?php

use Illuminate\Support\Facades\Route;
use App\Features\Events\Controllers\EventsController;

Route::get('/', [EventsController::class, 'index'])->name('events.index');
Route::get('/{id}', [EventsController::class, 'show'])->name('events.show');
