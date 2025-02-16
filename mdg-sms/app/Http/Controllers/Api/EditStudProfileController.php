<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Student;
use App\Models\Prev_school;
use App\Models\User;
use App\Http\Resources\EditStudProfileResource;

class EditStudProfileController extends Controller
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
        try {
            $studentDetails = DB::table('students')
            ->join('prev_schools','students.prev_school_id','=','prev_schools.id')
            ->join('users','students.user_id','=','users.id')
            ->join('programs','students.program_id','=','programs.id')
            ->join('years','students.year_id','=','years.id')
            ->join('people','students.person_id','=','people.id')
            ->select(
                'prev_schools.name as prevSchool',
                'prev_schools.landline as prevSchoolLandline',
                'prev_schools.email as prevSchoolEmail',
                'students.id as studentId',
                'users.email as studentEmail',
                'programs.name as program',
                'years.name as year',
                'people.first_name as firstName',
                'people.middle_name as middleName',
                'people.last_name as lastName',
                'people.suffix',
                'people.dob',
            )
            ->where('students.id','=',$id)
            ->first();

            $response = [
                'profile' => new EditStudProfileResource($studentDetails)
            ];

            return response()->json($response);

        } catch (\Exception $e){
            return response()->json(['error' => $e], 500);
        }
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {

            $student = Student::where('id',$id)
            ->first();

            if (!$student) {
                return response()->json(['error' => 'Student not found'], 404);
            }
            
            $student->user->update(['email' => $request->studentEmail]);

            $existingPrevSchool = Prev_school::where('name', $request->prevSchool)
            ->where('email', $request->prevSchoolEmail)
            ->first();
 
            if ($existingPrevSchool) {
 
                $prevSchool = $existingPrevSchool;
 
            } else {              
                 $prevSchool = Prev_school::create([
                     'landline' => $request->prevSchoolLandline,
                     'name' => $request->prevSchool,
                     'email' => $request->prevSchoolEmail
                 ]);
            }
            $student->person->update([
                'first_name' => $request->firstName,
                'middle_name' => $request->middleName,
                'last_name' => $request->lastName,
                'suffix' => $request->suffix,
                'dob' => date('Y-m-d', strtotime($request->dob))
            ]);

            $student->update([
                'id' => $request->studentNo,
                'program_id' => $request->program,
                'year_id' => $request->year, 
                'prev_school_id' => $prevSchool->id              
            ]);

            DB::commit();

        } catch (\Exception $e){

            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
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
