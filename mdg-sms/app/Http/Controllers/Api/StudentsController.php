<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\StudentResource;
use App\Http\Resources\StudentProfileResource;
use App\Models\Student;
use App\Models\User;
use App\Models\Person;
use App\Models\Program;
use App\Models\Scholarship;
use App\Models\Scholarship_status;
use App\Models\Contact_num;
use App\Models\Address;
use App\Models\Address_person;
use App\Models\Application;
use App\Models\File_submitted;
use App\Http\Requests\AddStudentRequest;
use Illuminate\Support\Facades\Log;


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
            public function store(AddStudentRequest $request)
            {
                $validatedData = $request->validated();
            
                DB::beginTransaction();
            
                try {
                    // Create the person
                    $person = Person::create([
                        'first_name' => $validatedData['first_name'],
                        'last_name' => $validatedData['last_name'],
                        'middle_name' => $validatedData['middle_name'],
                        'suffix' => $validatedData['suffix'],
                        'dob' => $validatedData['dob'],
                    ]);
            
                    // Create the user
                    $user = User::create([
                        'email' => $validatedData['email'],
                        'scholarship_status_id' => $validatedData['scholarship_status_id'],
                    ]);
            
                    // Create the student
                    $student = Student::create([
                        'user_id' => $user->id,
                        'person_id' => $person->id,
                        'program_id' => $validatedData['program_id'],
                    ]);
            
                    // Create the application
                    if (isset($validatedData['scholarship_id'])) {
                        Application::create([
                            'student_id' => $student->id,
                            'scholarship_id' => $validatedData['scholarship_id'],
                            'is_current' => 1,
                        ]);
                    }
            
                    // Create the contact number
                    if (isset($validatedData['mobile_num'])) {
                        Contact_num::create([
                            'person_id' => $person->id,
                            'nums' => $validatedData['mobile_num'],
                        ]);
                    }
            
                    // Create the address
                    if (isset($validatedData['address'])) {
                        $address = Address::create([
                            'house_block_unit_no' => $validatedData['address']['house_block_unit_no'],
                            'street' => $validatedData['address']['street'],
                            'barangay' => $validatedData['address']['barangay'],
                            'city' => $validatedData['address']['city'],
                            'municipality' => $validatedData['address']['municipality'],
                            'zip_code' => $validatedData['address']['zip_code'],
                        ]);
                        Address_person::create([
                            'person_id' => $person->id,
                            'address_id' => $address->id,
                        ]);
                    }
            
                    DB::commit();
            
                    return response()->json(['message' => 'Student created successfully'], 201);
                } catch (\Exception $e) {
                    DB::rollBack();
                    \Log::error('Error creating student: ' . $e->getMessage());
                    return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
                }
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
                        ->join('years','students.year_id','=','years.id')
                        ->select(
                            'students.id',
                            'students.user_id',
                            'people.first_name',
                            'people.last_name',
                            'people.middle_name',
                            'people.suffix',
                            'people.dob',
                            'programs.name as program',
                            'users.email as schoolEmail',
                            'people.email as personalEmail', 
                            'contact_nums.nums as mobileNum', 
                            'applications.id as applicationId', 
                            'scholarship_statuses.name as status',
                            'scholarships.name as scholarship',
                            'years.name as year'         
                        )
                        ->where('students.id','=',$id)
                        ->first();
            if (!$profile) {
                return response()->json(['error' => "Student not found: {$id}"], 404);
            }

            $files = File_submitted::where('application_id',$profile->applicationId)
                    ->select(['name','is_submitted'])
                    ->get();
            
            $response = [
                'profile' => new StudentProfileResource($profile),
                'files' => $files->toArray()
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        DB::beginTransaction();
        try {
            $ids = $request->input('student_id', []);


            if (!is_array($ids) || empty($ids)) {
                return response()->json(['error' => 'Invalid request data'], 400);
            }


            foreach ($ids as $id) {
                $student = Student::where('id', $id)->first();

                if (!$student) {
                    return response()->json(['error' => "Student with ID $id not found"], 404);
                }

                Person::where('id', $student->person_id)->delete();
            }

            DB::commit();

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Exception caught: ' . $e->getMessage(), ['exception' => $e]);

            return response()->json(['error' => 'Something went wrong'], 500);
        };
    }
}
