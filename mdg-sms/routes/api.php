<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/AdminDash', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// PersonController
Route::apiResource('persons', PersonController::class);

// StudentController
Route::apiResource('student', StudentController::class);