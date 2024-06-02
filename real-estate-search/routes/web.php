<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;

Route::get('/properties', [PropertyController::class, 'search'])->name('properties.search');
