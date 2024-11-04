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
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'suffix' => 'nullable|string|max:10',
            'dob' => 'required|date',
            'email' => 'required|email|unique:users,email',
            'personal_email' => 'nullable|email',
            'mobile_num' => 'nullable|string|max:15',
            'program_id' => 'required|exists:programs,id',
            'scholarship_id' => 'nullable|exists:scholarships,id',
            'scholarship_status_id' => 'required|exists:scholarship_statuses,id',
            'address' => 'nullable|array',
            'address.house_block_unit_no' => 'nullable|string|max:255',
            'address.street' => 'nullable|string|max:255',
            'address.barangay' => 'nullable|string|max:255',
            'address.city' => 'nullable|string|max:255',
            'address.municipality' => 'nullable|string|max:255',
            'address.zip_code' => 'nullable|string|max:10',
        ]);

        DB::beginTransaction();

        try {
            // Create or find the person
            $person = Person::updateOrCreate(
                [
                    'first_name' => $validatedData['first_name'],
                    'last_name' => $validatedData['last_name'],
                    'middle_name' => $validatedData['middle_name'],
                    'suffix' => $validatedData['suffix'],
                    'dob' => $validatedData['dob'],
                ],
                $validatedData
            );

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
                $address = Address::create($validatedData['address']);
                Address_person::create([
                    'person_id' => $person->id,
                    'address_id' => $address->id,
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Student created successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Something went wrong'], 500);
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
