<?php

use Illuminate\Support\Facades\Route;
use App\Features\News\Controllers\NewsController;

Route::get('/', [NewsController::class, 'index'])->name('news.index');
Route::get('/{slug}', [NewsController::class, 'show'])->name('news.show');
