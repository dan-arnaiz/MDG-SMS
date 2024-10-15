<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request){

        $data = $request->validated();
        if (!Auth::attempt($credentials)) {
            
            return response([
                'message' => 'Provided email address or password is incorrect'
            ], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user','token'));
    }
    public function signup(SignuRequest $request){

        $data = $request->validated();
        /** @var \App\Models\User $user */

        $user = User::create([

            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }
}
