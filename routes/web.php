<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/api/user/avatar', [UserController::class, 'getAvatar']);

Route::get('/{vue_capture?}', function () {
    return view('welcome');
})->where('vue_capture', '[\/\w\.-]*');

Route::get("/test-me", function () {
    return 'Hello from Laravel!';
});
