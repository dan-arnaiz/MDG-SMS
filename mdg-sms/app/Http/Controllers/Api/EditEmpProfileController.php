<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Person;
use App\Models\Job_title;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class EditEmpProfileController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $employee = DB::table('employees')
        ->join('job_titles','employees.job_title_id','=','job_titles.id')
        ->join('people','employees.person_id','=','people.id')
        ->select([
            'job_titles.title as jobTitle',
            'people.first_name as firstName',
            'people.middle_name as middleName',
            'people.last_name as lastName',
            'people.suffix',
            'people.dob'
        ])
        ->where('employees.id',$id)
        ->first();

        if ($employee) {
            $employee->suffix = $employee->suffix ?? ""; // Ensures suffix is always set
        }

        return response()->json($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try{
            $employee = Employee::where('id',$id)->first();

            if(!$employee) response()->json(['error' => 'Employee not found'],400);

            $employee->update(['id' => $request['id']]);

            $employee->Person->update([
                'first_name' => $request['firstName'],
                'middle_name' => $request['middleName'],
                'last_name' => $request['lastName'],
                'suffix' => $request['suffix']
            ]);

            $existingJobTitle = Job_title::where('title',$request['jobTitle'])->first();

            if ($existingJobTitle) {
                $employee->update(['job_title_id' => $existingJobTitle->id]);
            } else {
                $newJobTitle= Job_title::create([
                'title' => $request['jobTitle'],
                'description' => ""
                ]);

                $employee->update(['job_title_id' => $newJobTitle->id]);
            }

            DB::commit();

        } catch (\Exception $e) {

            DB::rollBack();

            Log::error('Detailed Error:', [
                'message' => $e->getMessage(), // Error message
                'file' => $e->getFile(),       // File where the error happened
                'line' => $e->getLine(),       // Line number of error
                'code' => $e->getCode(),       // Error code
                'trace' => $e->getTraceAsString() // Full stack trace
            ]);

            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
