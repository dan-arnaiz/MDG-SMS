<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\EmployeesResource;
use Illuminate\Support\Facades\Log;

class EmployeeController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try{
            $employees = DB::table('employees')
            ->join('people','employees.person_id','=','people.id')
            ->join('job_titles','employees.job_title_id','=','job_titles.id')
            ->join('users','employees.user_id','=','users.id')
            ->select([
                'employees.id',
                'people.first_name',
                'people.last_name',
                'people.middle_name',
                'people.suffix',
                'job_titles.title as job',
                'users.email'
            ])
            ->get();
    
            return EmployeesResource::collection($employees);

        } catch (\Exception $e) {
            Log::error('Detailed Error:', [
                'message' => $e->getMessage(), // Error message
                'file' => $e->getFile(),       // File where the error happened
                'line' => $e->getLine(),       // Line number of error
                'code' => $e->getCode(),       // Error code
                'trace' => $e->getTraceAsString() // Full stack trace
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
