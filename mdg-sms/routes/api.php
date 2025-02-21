<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\RelativeController;
use App\Http\Controllers\Api\ScholarshipController;
// use App\Http\Controllers\Api\AnalyticsController;
// use App\Http\Controllers\Api\FilesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

// CSRF Cookie Route
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

// Public Auth Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth Routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/refresh-token', [AuthController::class, 'refresh']);
    });

    // User Routes
    Route::apiResource('users', UserController::class);

    // Student Routes
    Route::apiResource('students', StudentController::class);

    // Relative Routes
    Route::apiResource('relatives', RelativeController::class);

    // Scholarship Routes
    Route::apiResource('scholarships', ScholarshipController::class);

    // // Analytics Routes
    // Route::get('/analytics', [AnalyticsController::class, 'index']);

    // // File Routes
    // Route::get('/files', [FilesController::class, 'index']);
});