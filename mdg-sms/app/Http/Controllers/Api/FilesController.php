<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\FileResource;

use Illuminate\Http\Request;

class FilesController extends Controller
{
    public function index()
    {
        try{
            $files = DB::table('files')
                        ->select(                         
                            'files.id',
                            'files.name',
                        )
                        ->get();
            return FileResource::collection($files);     
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}
