<?php

use Illuminate\Support\Facades\Route;
use App\Features\Gallery\Controllers\GalleryController;

Route::get('/', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/featured', [GalleryController::class, 'featured'])->name('gallery.featured');
Route::get('/{id}', [GalleryController::class, 'show'])->name('gallery.show');
