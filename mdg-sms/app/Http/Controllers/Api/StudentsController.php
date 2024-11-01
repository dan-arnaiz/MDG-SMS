<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\StudentResource;

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
                        ->paginate();
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
