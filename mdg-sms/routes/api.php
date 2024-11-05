<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentsController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\ScholarshipsController;
use App\Http\Controllers\Api\FilesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;


Route::middleware('auth:sanctum')->get('/AdminDash', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/analytics', [AnalyticsController::class, 'index'])->middleware('auth:sanctum');
Route::get('/files', [FilesController::class, 'index'])->middleware('auth:sanctum');
Route::apiResource('/students', StudentsController::class)->middleware('auth:sanctum');
Route::apiResource('/scholarships', ScholarshipsController::class)->middleware('auth:sanctum');
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);