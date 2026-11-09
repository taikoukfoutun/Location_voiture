<?php

use App\DbBridge;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\GestionnaireController;
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

// Cars Management Routes
Route::get('/cars', [CarController::class, 'index']);
Route::post('/cars', [CarController::class, 'store']);
Route::get('/cars/{id}', [CarController::class, 'show']);
Route::post('/cars/{id}', [CarController::class, 'update']);
Route::match(['put', 'patch'], '/cars/{id}', [CarController::class, 'update']);
Route::delete('/cars/{id}', [CarController::class, 'destroy']);

// Gestionnaires Management Routes (Super Admin)
Route::get('/admin/gestionnaires', [GestionnaireController::class, 'index']);
Route::post('/admin/gestionnaires', [GestionnaireController::class, 'store']);
Route::put('/admin/gestionnaires/{id}', [GestionnaireController::class, 'update']);
Route::delete('/admin/gestionnaires/{id}', [GestionnaireController::class, 'destroy']);
