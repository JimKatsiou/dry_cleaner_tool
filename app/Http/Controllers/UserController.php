<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function getAvatar()
    {
        //$userId = auth()->id(); // Assuming the user is authenticated
        //$avatarPath = "avatars/{$userId}.jpg"; // Replace with your logic
        $avatarPath = "public/Screenshot_3.png";

        if (Storage::exists($avatarPath)) {
            $file = Storage::get($avatarPath);
            $type = Storage::mimeType($avatarPath);
    
            return response($file, 200)->header('Content-Type', $type);
        }
    
        return response('Image not found', 404);
    }
}