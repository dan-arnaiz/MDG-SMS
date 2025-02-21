<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Employee;
use App\Http\Resources\EmployeesResource;
use App\Http\Resources\StudentResource;
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
        $employee = DB::table('employees')
        ->join('people','employees.person_id','=','people.id')
        ->join('job_titles','employees.job_title_id','=','job_titles.id')
        ->join('users','employees.user_id','=','users.id')
        ->select([
            'people.id',
            'people.first_name as firstName',
            'people.middle_name as middleName',
            'people.last_name as lastName',
            'people.suffix as suffix',
            'people.email as personalEmail',
            'people.dob',
            'users.email as employeeEmail',
            'job_titles.title as jobTitle'
        ])
        ->where('employees.id',$id)
        ->first();

        $addresses = DB::table('address_person')
        ->join('people','address_person.person_id','=','people.id')
        ->join('addresses','address_person.address_id','=','addresses.id')
        ->join('barangays','addresses.barangay_id','=','barangays.id')
        ->join('cities','barangays.city_id','=','cities.id')
        ->join('provinces','cities.province_id','=','provinces.id')
        ->select([
            DB::raw("CONCAT(address_person.house_num, ' ', addresses.street, ', ', barangays.name, ', ', cities.name, ', ', provinces.name, ' ', addresses.zipcode) AS full_address"),
            'address_person.type as type'
        ])
        ->where('address_person.person_id',$employee->id)
        ->get();

        $contacts = DB::table('contact_nums')
        ->select([
            'contact_nums.nums',
            'contact_nums.title as type'
        ])
        ->where('contact_nums.person_id',$employee->id)
        ->get();

        $students = DB::table('applications')
        ->join('students','applications.student_id','=','students.id')
        ->join('people','students.person_id','=','people.id')
        ->join('subtypes','applications.subtype_id','=','subtypes.id')
        ->join('scholarships','subtypes.scholarship_id','=','scholarships.id')
        ->join('users','students.user_id','=','users.id')
        ->join('scholarship_statuses','users.scholarship_status_id','scholarship_statuses.id')
        ->join('programs','students.program_id','=','programs.id')
        ->select([
            'students.id',
            'people.first_name',
            'people.middle_name',
            'people.last_name',
            'people.suffix',
            'scholarships.name as scholarship',
            'subtypes.name as type',
            'programs.name as program',
            'scholarship_statuses.name as status',
            'applications.created_at as created'

        ])
        ->where('applications.employee_id',$id)
        ->get();

        $response = [
            'employee' => $employee,
            'addresses' => $addresses,
            'contacts' => $contacts,
            'students' => StudentResource::collection($students)
        ];

        return response()->json($response);
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
        try{
            $employee=Employee::where('id',$id)->first();

            if (!$employee) return response()->json(['error' => 'Employee not found'], 404);

            $employee->user->delete();
            $employee->delete();

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
}
