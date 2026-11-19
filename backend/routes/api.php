<?php

use App\DbBridge;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GestionnaireController;
use App\Http\Controllers\RentalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/db-status', function () {
    return response()->json([
        'status' => 'success',
        'connection' => DbBridge::checkConnection(),
        'table' => DbBridge::getUsersTableStats(),
    ]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// User Profile & Driver Verification Routes
Route::get('/users/{id}/profile', [RentalController::class, 'getProfile']);
Route::post('/users/{id}/profile', [RentalController::class, 'updateProfile']);
Route::put('/users/{id}/profile', [RentalController::class, 'updateProfile']);

// Cars Management Routes
Route::get('/cars', [CarController::class, 'index']);
Route::post('/cars', [CarController::class, 'store']);
Route::get('/cars/{id}', [CarController::class, 'show']);
Route::post('/cars/{id}', [CarController::class, 'update']);
Route::match(['put', 'patch'], '/cars/{id}', [CarController::class, 'update']);
Route::delete('/cars/{id}', [CarController::class, 'destroy']);

// Reservations / Rentals Management Routes
Route::get('/reservations', [RentalController::class, 'index']);
Route::post('/reservations', [RentalController::class, 'store']);
Route::put('/reservations/{id}/status', [RentalController::class, 'updateStatus']);
Route::post('/reservations/{id}/status', [RentalController::class, 'updateStatus']);

// Gestionnaires Management Routes (Super Admin)
Route::get('/admin/gestionnaires', [GestionnaireController::class, 'index']);
Route::post('/admin/gestionnaires', [GestionnaireController::class, 'store']);
Route::put('/admin/gestionnaires/{id}', [GestionnaireController::class, 'update']);
Route::delete('/admin/gestionnaires/{id}', [GestionnaireController::class, 'destroy']);

// Contact & Concierge Inquiries Routes
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contact-messages', [ContactController::class, 'index']);
Route::put('/contact-messages/{id}/status', [ContactController::class, 'updateStatus']);
Route::post('/contact-messages/{id}/status', [ContactController::class, 'updateStatus']);
Route::delete('/contact-messages/{id}', [ContactController::class, 'destroy']);
