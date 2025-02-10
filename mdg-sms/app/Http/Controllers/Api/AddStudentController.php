<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Scholarship;
use App\Models\Province;
use App\Models\City;
use App\Models\Program;
use App\Models\Year;
use App\Models\Academic_year;
use App\Models\Semester;
use App\Models\Person;
use App\Models\Contact_num;
use App\Models\Address;
use App\Models\Address_person;
use App\Models\Guardian;
use App\Models\Guardian_relation;
use App\Models\Prev_school;
use App\Models\Sibling;
use App\Models\Sibling_relation;
use App\Models\Application;
use App\Models\File_submitted;
use App\Models\Employee;
use App\Models\User;
use App\Http\Resources\ScholarshipResource;
use App\Http\Resources\ProvinceResource;
use App\Http\Requests\UpdateStudentRequest;
use Illuminate\Support\Facades\Log;

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

            $programs = Program::select(
                'id',
                'name'
            )->get();

            $years = Year::select(
                'id',
                'name'
            )->get();

            $academicYears = Academic_year::select(
                'id',
                'name'
            )->get();

            $semesters = Semester::select(
                'id',
                'name'
            )->get();

            return response()->json([
                'scholarships' => ScholarshipResource::collection($scholarships),
                'provinces' => ProvinceResource::collection($provinces),
                'programs' => ProvinceResource::collection($programs),
                'years' => ProvinceResource::collection($years),
                'academicYears' => ProvinceResource::collection($academicYears),
                'semesters' => ProvinceResource::collection($semesters)
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try{

            $data = $request;

            $employeeUserId = $data->userId;

            $personal = $data->input('personal');

            $employee= Employee::where('user_id', $employeeUserId)->first();

            if (!$employee) return response()->json(['error' => 'Invalid Access'], 400);

            $organization = $data->input('organization') ?? [];
              
            $studentNo = $organization['studentNo'];

            $errors = [];

            if (Student::where('id', $studentNo)->exists()) {
                $errors['studentNo'] = 'Student ID already exists in the scholarship database.';
            }

            if (Person::where('email', $personal['email'])->exists()) {
                $errors['email'] = 'Personal email already exists.';
            }

            if (User::where('email', $organization['studentEmail'])->exists()) {
                $errors['studentEmail'] = 'Student email already exists.';
            }

            if (!empty($errors)) {
                return response()->json(['errors' => $errors], 409);
            }

            //creating the person

            $studentPerson = Person::create([
                'first_name' => $personal['firstName'],
                'middle_name' => $personal['middleName'],
                'last_name' => $personal['lastName'],
                'suffix' => $personal['suffix'],
                'dob' => $personal['dob'],
                'email' => $personal['email'],
            ]);

            //creating address
         
            $permanentAddress = $data->input('permAddress') ?? [];

            $existingPermAddress = Address::where('barangay_id', $permanentAddress['barangay'])
                ->where('zipcode', $permanentAddress['zipCode'])
                ->where('street', $permanentAddress['street'])
                ->first();

            if ($existingPermAddress) {
                $permAddress = $existingPermAddress;
            } else {
                $permAddress = Address::create([
                    'barangay_id' => $permanentAddress['barangay'],
                    'zipcode' => $permanentAddress['zipCode'],
                    'street' => $permanentAddress['street']
                ]);
            }

            $mailingAddress = $data->input('mailAddress') ?? [];

            if (!empty($mailingAddress)){

                $existingMailAddress = Address::where('barangay_id', $mailingAddress['barangay'])
                ->where('zipcode', $mailingAddress['zipCode'])
                ->where('street', $mailingAddress['street'])
                ->first();

                if ($existingMailAddress) {
                    $mailAddress = $existingMailAddress;
                } else {
                    $mailAddress = Address::create([
                        'barangay_id' => $mailingAddress['barangay'],
                        'zipcode' => $mailingAddress['zipCode'],
                        'street' => $mailingAddress['street']
                    ]);
                }
            } else $mailAddress = [];

            //creating previous school

            $scholarship = $data->input('scholarshipData') ?? [];

            $existingPrevSchool = Prev_school::where('landline', $scholarship['prevSchoolLandline'])
                 ->where('name', $scholarship['prevSchool'])
                 ->where('email', $scholarship['prevSchoolEmail'])
                 ->first();
 
            if ($existingPrevSchool) {
 
                 $prevSchool = $existingPrevSchool;
 
            } else {              
                 $prevSchool = Prev_school::create([
                     'landline' => $scholarship['prevSchoolLandline'],
                     'name' => $scholarship['prevSchool'],
                     'email' => $scholarship['prevSchoolEmail']
                 ]);
            }
 
             //creating user            
 
             $studentUser = User::create([
                 'name' => $personal['firstName'],
                 'email' => $organization['studentEmail'],
                 'password' => bcrypt($organization['studentNo']),
                 'scholarship_status_id' => 1,
                 'role_id' => null
             ]);

            DB::afterCommit(function () use ($scholarship, $employee,$data,$organization,$studentPerson, $permAddress, $permanentAddress, $mailAddress, $mailingAddress, $studentUser, $prevSchool, $personal) {
                $studentMobile = Contact_num::create([
                    'person_id' => $studentPerson->id,
                    'title' => 'Mobile Number',
                    'nums' => $personal['mobileNum'] ?? null
                ]);
    
                if ($personal['landline'] != null){
                    $studentLandline = Contact_num::create([
                        'person_id' => $studentPerson->id,
                        'title' => 'Landline',
                        'nums' => $personal['landline']
                    ]);
                }

                $permAddressPerson = Address_person::create([
                    'person_id' => $studentPerson->id,
                    'address_id' => $permAddress->id,
                    'type' => 'Permanent Address',
                    'is_alsoMail' => $data->sameAddress,
                    'house_num' => $permanentAddress['houseBlockUnitNo']
                ]);

                if (!empty($mailingAddress)){

                    $mailAddressPerson = Address_person::create([
                        'person_id' => $studentPerson->id,
                        'address_id' => $mailAddress->id,
                        'type' => 'Mailing Address',
                        'is_alsoMail' => $data->sameAddress,
                        'house_num' => $mailingAddress['houseBlockUnitNo']
                    ]);
                }

                // creating student

                $student = Student::create([
                    'id' => $organization['studentNo'],
                    'person_id' => $studentPerson->id,
                    'prev_school_id' => $prevSchool->id,
                    'user_id' => $studentUser->id,
                    'program_id' => $organization['program'],
                    'year_id' => $organization['year']
                ]);

                DB::afterCommit(function () use ( $data, $scholarship, $employee, $organization) {        

                    //creating guardians

                    //creating guardians

                    $father = $data->input('father');
                    $mother = $data->input('mother');

                    $this->createGuardian($father, $organization);
                    $this->createGuardian($mother, $organization);

    
                    //create siblings
    
                    foreach($data['siblingsData'] as $sibling){
    
                        $existingSiblingPerson = Person::where('first_name', $sibling['firstName'])
                            ->where('middle_name', $sibling['middleName'])
                            ->where('last_name', $sibling['lastName'])
                            ->where('dob', $sibling['dob']) // You can use more fields to ensure uniqueness
                            ->first();
                        
                        if ($existingSiblingPerson){
    
                            $existingSibling = Sibling::where('person_id',$existingSiblingPerson->id)->first();
    
                            if ($existingSibling){
    
                                Sibling_relation::Create([
                                    'student_id' => $organization['studentNo'],
                                    'sibling_id' => $existingSibling->id              
                                ]);
    
                            } else {
    
                                $siblingSibling = Sibling::Create([
                                    'person_id' => $existingSiblingPerson->id,
                                    'edu_attain' =>$sibling['educationalAttainment'],
                                ]);
    
                                DB::afterCommit(function () use ($siblingSibling, $organization){
                                    Sibling_relation::Create([
                                        'student_id' => $organization['studentNo'],
                                        'sibling_id' => $siblingSibling->id              
                                    ]);
                                });
                            }
                        } else{
    
                            $studentSibling = Person::Create([
                                'first_name' => $sibling['firstName'],
                                'middle_name' => $sibling['middleName'],
                                'last_name' => $sibling['lastName'],
                                'suffix' => $sibling['suffix'],
                                'dob' => $sibling['dob'],
                            ]);
    
                            DB::afterCommit(function () use ($studentSibling, $organization, $sibling){
                                $siblingSibling = Sibling::Create([
                                    'person_id' => $studentSibling->id,
                                    'edu_attain' =>$sibling['educationalAttainment'],
                                ]);
    
                                DB::afterCommit(function () use ($siblingSibling, $organization){
                                    Sibling_relation::Create([
                                        'student_id' => $organization['studentNo'],
                                        'sibling_id' => $siblingSibling->id              
                                    ]);                                                             
                                }); 
                            });                                                       
                        }
                    }
    
                    $year = date('Y'); // Get current year
    
                    // Get the last application ID for the current year
                    $lastApplication = Application::where('id', 'LIKE', "A{$year}%")
                                                ->orderBy('id', 'desc')
                                                ->first();
    
                    if ($lastApplication) {
                        // Extract the numeric part and increment
                        $lastNumber = (int) substr($lastApplication->id, 5);
                        $newNumber = str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT);
                    } else {
                        // If no applications exist for the current year, start from 00001
                        $newNumber = '00001';
                    }
    
                    // Construct the new ID
                    $newId = "A{$year}{$newNumber}";
    
                    //create application
    
                    $newApplication = Application::Create([
    
                        'id' => $newId,
                        'student_id' => $organization['studentNo'],
                        'employee_id' => $employee->id,
                        'scholarship_id' => $scholarship['scholarship'],
                        'semester_id' => $organization['semester'],
                        'academic_year_id' => $organization['academicYear'],
                        'date_filed' => now(),
                        'date_terminated' => null,
                        'is_current' => true
                    ]);
    
                    DB::afterCommit(function () use ($newApplication, $data){
    
                        //create submitted files
        
                        foreach ($data['filesData'] as $file){
        
                            File_submitted::Create([
                                'application_id' => $newApplication->id,
                                'name' => $file['name'],
                                'is_submitted' => $file['is_submitted']
                            ]);
                        }
                        
                    });
                 
                });
            });          

            DB::commit();
            return response()->json(['success' => 'Student registered successfully.']);

        } catch (\Exception $e) {

            DB::rollBack();

            Log::error('Exception caught: ' . $e->getMessage(), [
                'exception' => $e
            ]);

            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    private function createGuardian($guardian, $organization){

        if ($guardian == null) return;

        $existPerson = Person::where('first_name', $guardian['firstName'])
                        ->where('middle_name', $guardian['middleName'])
                        ->where('last_name', $guardian['lastName'])
                        ->first();

        if ($existPerson){

            $existGuardian = Guardian::where('person_id', $existPerson->id)->first();

            if($existGuardian){

                Guardian_relation::Create([
                    'student_id' => $organization['studentNo'],
                    'guardian_id' => $existGuardian->id
                ]);

            } else{

                $newGuardian = Guardian::Create([
                    'person_id' => $existPerson->id,
                    'occupation' => $guardian['occupation'],
                    'office_num' => $guardian['officeNo']
                ]);

                DB::afterCommit(function () use ($newGuardian, $organization){
                    Guardian_relation::Create([
                        'student_id' => $organization['studentNo'],
                        'guardian_id' => $newGuardian->id
                    ]);
                });                   
            }
        } else {

            $newPerson = Person::Create([
                'first_name' => $guardian['firstName'],
                'middle_name' => $guardian['middleName'],
                'last_name' => $guardian['lastName'],
                'suffix' => $guardian['suffix'],
                'email' => $guardian['email'],
            ]);

            DB::afterCommit(function () use ($newPerson, $organization, $guardian){
                $newGuardian = Guardian::Create([
                    'person_id' => $newPerson->id,
                    'occupation' => $guardian['occupation'],
                    'office_num' => $guardian['officeNo']
                ]);

                DB::afterCommit(function () use ($newGuardian, $organization){
                    Guardian_relation::Create([
                        'student_id' => $organization['studentNo'],
                        'guardian_id' => $newGuardian->id
                    ]);
                });            
            });            
        }               
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
