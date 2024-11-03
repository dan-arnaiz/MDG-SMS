<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\StudentResource;
use App\Http\Resources\StudentProfileResource;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $students = DB::table('applications')
                        ->join('students','applications.student_id','=','students.id')
                        ->join('people','students.person_id','=','people.id')
                        ->join('programs','students.program_id','=','programs.id')
                        ->join('users','students.user_id','=','users.id')
                        ->join('scholarship_statuses','users.scholarship_status_id','=','scholarship_statuses.id')
                        ->join('scholarships','applications.scholarship_id','=','scholarships.id')
                        ->select(                         
                            'people.first_name',
                            'people.last_name',
                            'people.middle_name',
                            'people.suffix',
                            'students.id as student_id',
                            'scholarships.name as scholarship',
                            'users.email',
                            'programs.name as program',
                            'scholarship_statuses.name as status'
                        )
                        ->where('applications.is_current','=','1')
                        ->get();
            return StudentResource::collection($students);     
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
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
        try{
            $profile = DB::table('students')
                        ->join('users','students.user_id','=','users.id')
                        ->join('scholarship_statuses','users.scholarship_status_id','=','scholarship_statuses.id')
                        ->join('people','students.person_id','=','people.id')                   
                        ->join('address_person','address_person.person_id','=','people.id')
                        ->join('addresses','address_person.address_id','=','addresses.id')
                        ->join('programs','students.program_id','=','programs.id')
                        ->join('applications','applications.student_id','=','students.id')
                        ->join('scholarships','applications.scholarship_id','=','scholarships.id')
                        ->join('contact_nums','contact_nums.person_id','=','people.id')
                        ->select(
                            'students.id',
                            'students.user_id',
                            'people.first_name',
                            'people.last_name',
                            'people.middle_name',
                            'people.suffix',
                            'people.dob',
                            'programs.year',
                            'programs.name as program',
                            'users.email as schoolEmail',
                            'people.email as personalEmail', 
                            'contact_nums.nums as mobileNum',  
                            'scholarship_statuses.name as status',         
                        )
                        ->where('students.id','=',$id)
                        ->first();
            if (!$profile) {
                return response()->json(['error' => "Student not found: {$id}"], 404);
            }
            return new StudentProfileResource($profile);
        } catch (\Exception $e){
            return response()->json(['error' => $e], 500);
        }
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
