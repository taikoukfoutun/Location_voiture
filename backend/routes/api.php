<?php

use App\DbBridge;
use App\Http\Controllers\AuthController;
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
