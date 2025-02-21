<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\City;
use App\Models\Barangay;
use App\Http\Resources\addStudentFileResource;

class LocationController
{
    public function getCities($provinceId)
    {
        $cities = City::where('province_id', $provinceId)->orderBy('name', 'asc')->get(['id', 'name']);
        return response()->json($cities);
    }
    public function getBarangays($cityId)
    {
        $barangays = Barangay::where('city_id', $cityId)->orderBy('name', 'asc')->get(['id', 'name']);
        return response()->json($barangays);
    }
    public function getFiles($scholarshipId)
    {
        $files = DB::table('file_reqs')
                    ->join('files', 'file_reqs.file_id', '=', 'files.id')
                    ->select(                         
                        'files.name',
                    )
                    ->where('file_reqs.scholarship_id', $scholarshipId)
                    ->get();
        
        $subtypes = DB::table('subtypes')
        ->select('id','name','description')
        ->where('scholarship_id',$scholarshipId)
        ->get();

        $response = [
            'files' => addStudentFileResource::collection($files),
            'types' => $subtypes
        ];

        return response()->json($response);
    }
}
