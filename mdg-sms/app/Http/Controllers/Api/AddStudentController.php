<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use App\Models\Scholarship;
use App\Models\Province;
use App\Models\City;
use App\Http\Resources\ScholarshipResource;
use App\Http\Resources\ProvinceResource;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;

class AddStudentController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{

            $scholarships = Scholarship::select(
                'id',
                'name',
                'max_slots',
                'taken_slots',
                'is_full'
            )->get();
           
            $provinces = Province::select(
                'id',
                'name'
            )->orderBy('name', 'asc')
            ->get();

            return response()->json([
                'scholarships' => ScholarshipResource::collection($scholarships),
                'provinces' => ProvinceResource::collection($provinces)
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
    }
}
