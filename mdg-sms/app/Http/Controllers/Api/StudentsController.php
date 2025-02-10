<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\StudentResource;
use App\Http\Resources\StudentProfileResource;
use App\Models\{
    Student, User, Person, Program, Scholarship,
    ScholarshipStatus, ContactNum, Address, Application,
    AcademicYear, Semester, PrevSchool
};
use App\Http\Requests\AddStudentRequest;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $students = DB::table('applications')
                ->join('students', 'applications.student_id', '=', 'students.id')
                ->join('people', 'students.person_id', '=', 'people.id')
                ->join('programs', 'students.program_id', '=', 'programs.id')
                ->join('users', 'students.user_id', '=', 'users.id')
                ->join('scholarship_statuses', 'students.scholarship_status_id', '=', 'scholarship_statuses.id')
                ->leftJoin('scholarships', 'students.scholarship_id', '=', 'scholarships.id')
                ->join('academic_years', 'students.academic_year_id', '=', 'academic_years.id')
                ->join('semesters', 'students.semester_id', '=', 'semesters.id')
                ->select(
                    'people.first_name',
                    'people.last_name',
                    'people.middle_name',
                    'people.suffix',
                    'students.id as student_id',
                    'scholarships.name as scholarship',
                    'users.email',
                    'programs.name as program',
                    'scholarship_statuses.name as status',
                    'academic_years.start_year as academic_year',
                    'semesters.name as semester'
                )
                ->where('applications.is_current', '=', 1)
                ->get();

            return StudentResource::collection($students);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
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
                'first_name'     => $validatedData['firstName'],
                'last_name'      => $validatedData['lastName'],
                'middle_name'    => $validatedData['middleName'] ?? null,
                'suffix'         => $validatedData['suffix'] ?? null,
                'dob'            => $validatedData['dateOfBirth'],
                'personalEmail'  => $validatedData['personalEmail'] ?? null,
            ]);

            // Create the user
            $user = User::create([
                'email' => $validatedData['email'],
            ]);

            // Create the contact number
            $contactNum = ContactNum::create([
                'contactNum' => $validatedData['contactNum'] ?? null,
                'telNum'     => $validatedData['telNum'] ?? null,
                'person_id'  => $person->id,
            ]);

            // Create the address
            $address = Address::create([
                'houseblockUnitNo' => $validatedData['houseBlockUnitNo'] ?? null,
                'street'           => $validatedData['street'] ?? null,
                'barangay'         => $validatedData['barangay'] ?? null,
                'city'             => $validatedData['city'] ?? null,
                'province'         => $validatedData['province'] ?? null,
                'zipcode'          => $validatedData['zipCode'] ?? null,
            ]);

            // Create the previous school
            $prevSchool = PrevSchool::create([
                'name'     => $validatedData['prevSchool'],
                'landline' => $validatedData['prevSchoolLandline'] ?? null,
                'email'    => $validatedData['prevSchoolEmail'] ?? null,
                'address_id' => $address->id,
            ]);

            // Create the student
            $student = Student::create([
                'id'                    => $validatedData['studentNumber'],
                'user_id'               => $user->id,
                'person_id'             => $person->id,
                'program_id'            => $validatedData['program'],
                'semester_id'           => $validatedData['semester'],
                'academic_year_id'      => $validatedData['schoolyear'],
                'prev_school_id'        => $prevSchool->id,
                'scholarship_id'        => $validatedData['scholarship'] ?? null,
                'scholarship_status_id' => $validatedData['scholarshipStatus'],
                'contact_nums_id'       => $contactNum->id,
                'addresses_id'          => $address->id,
            ]);

            // Create the application if scholarship is provided
            if (isset($validatedData['scholarship'])) {
                Application::create([
                    'student_id'    => $student->id,
                    'scholarship_id'=> $validatedData['scholarship'],
                    'is_current'    => 1,
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
        try {
            $profile = DB::table('students')
                ->join('users', 'students.user_id', '=', 'users.id')
                ->join('scholarship_statuses', 'students.scholarship_status_id', '=', 'scholarship_statuses.id')
                ->join('people', 'students.person_id', '=', 'people.id')
                ->join('addresses', 'students.addresses_id', '=', 'addresses.id')
                ->join('programs', 'students.program_id', '=', 'programs.id')
                ->leftJoin('applications', 'applications.student_id', '=', 'students.id')
                ->leftJoin('scholarships', 'students.scholarship_id', '=', 'scholarships.id')
                ->join('contact_nums', 'students.contact_nums_id', '=', 'contact_nums.id')
                ->join('academic_years', 'students.academic_year_id', '=', 'academic_years.id')
                ->join('semesters', 'students.semester_id', '=', 'semesters.id')
                ->select(
                    'students.id',
                    'users.email as schoolEmail',
                    'people.first_name',
                    'people.last_name',
                    'people.middle_name',
                    'people.suffix',
                    'people.dob',
                    'programs.year',
                    'programs.name as program',
                    'contact_nums.contactNum as mobileNum',
                    'addresses.city',
                    'addresses.province',
                    'scholarships.name as scholarship',
                    'scholarship_statuses.name as status',
                    'academic_years.start_year as academic_year',
                    'semesters.name as semester'
                )
                ->where('students.id', $id)
                ->first();

            if (!$profile) {
                return response()->json(['error' => "Student not found: {$id}"], 404);
            }

            return new StudentProfileResource($profile);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
