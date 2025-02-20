<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Province;
use App\Models\Person;
use App\Models\Contact_num;
use App\Models\Job_title;
use App\Models\User;
use App\Models\Employee;
use App\Models\Address;
use App\Models\Address_person;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AddEmployeeController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::select('id','title')->get();

        $provinces = Province::select('id','name')->get();

        $response = [
            'roles' => $roles,
            'provinces' => $provinces
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try{

            //Generate user id
            $year = date('Y'); // Get current year
            $latestUser = Employee::where('id', 'LIKE', "{$year}%")->orderBy('id', 'desc')->first();

            if ($latestUser) {
                $lastNumber = (int) substr($latestUser->id, -5); // Extract last 5 digits
                $newNumber = str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT); // Increment and pad
            } else {
                $newNumber = '00001'; // Start from 00001 if no users exist
            }

            $userId = $year . $newNumber;

            $personal = $request->input('personalData');

            $organization = $request->input('organizationData');

            $person = Person::where('first_name',$personal['firstName'])
            ->where('middle_name',$personal['middleName'])
            ->where('last_name',$personal['lastName'])
            ->where('dob',$personal['dob'])
            ->where('email',$personal['email'])
            ->first();

            $existingEmail = Person::where('email',$personal['email'])->first();

            if ($existingEmail) {
                return response()->json(['error' => 'Email already exists.'], 400);
            }

            if(!$person) {
                $person = Person::create([
                    'first_name' => $personal['firstName'],
                    'middle_name' => $personal['middleName'],
                    'last_name' => $personal['lastName'],
                    'dob' => $personal['dob'],
                    'email' => $personal['email']
                ]);
            }

            if ($person) {
                Contact_num::where('person_id', $person->id)->delete();

                Contact_num::create([
                    'person_id' => $person->id,
                    'title' => 'Mobile Number',
                    'nums' => $personal['mobileNum'],          
                ]);

                if($personal['landline']){
                    Contact_num::create([
                        'person_id' => $person->id,
                        'title' => 'Landline',
                        'nums' => $personal['landline'],          
                    ]);
                }
            }

            $permAddress = $request->input('permAddressData');

            $existingPermAdd = Address::where('barangay_id',$permAddress['barangay'])
            ->where('street',$permAddress['street'])
            ->where('zipcode',$permAddress['zipCode'])
            ->first();

            if ($existingPermAdd){

                $permAdd = $existingPermAdd;

                $existingPersonAdd = Address_person::where('person_id',$person->id)
                ->where('address_id',$permAdd->id)
                ->where('type','Permanent Address')
                ->first();

                if (!$existingPersonAdd){
                    Address_person::create([
                        'person_id' => $person->id,
                        'address_id' => $permAdd->id,
                        'type' => 'Permanent Address',
                        'is_alsoMail' => $permAddress['sameAddress'],
                        'house_num' => $permAddress['houseBlockUnitNo']
                    ]);
                };

            } else {

                $permAdd = Address::create([
                    'barangay_id' => $permAddress['barangay'],
                    'zipcode' => $permAddress['zipCode'],
                    'street' => $permAddress['street'],
                ]);

                Address_person::create([
                    'person_id' => $person->id,
                    'address_id' => $permAdd->id,
                    'type' => 'Permanent Address',
                    'is_alsoMail' => $permAddress['sameAddress'],
                    'house_num' => $permAddress['houseBlockUnitNo']
                ]);
            }

            $mailAddress = $request->input('mailAddressData');

            if ($mailAddress){

                $existingMailAdd = Address::where('barangay_id',$mailAddress['barangay'])
                ->where('street',$mailAddress['street'])
                ->where('zipcode',$mailAddress['zipCode'])
                ->first();

                if ($existingMailAdd){

                    $mailAdd = $existingMailAdd;

                    $existingPersonAdd = Address_person::where('person_id',$person->id)
                    ->where('address_id',$mailAdd->id)
                    ->where('type','Mailing Address')
                    ->first();

                    if (!$existingPersonAdd){
                        Address_person::create([
                            'person_id' => $person->id,
                            'address_id' => $mailAdd->id,
                            'type' => 'Mailing Address',
                            'is_alsoMail' => $mailAddress['sameAddress'],
                            'house_num' => $mailAddress['houseBlockUnitNo']
                        ]);
                    };

                } else {

                    $mailAdd = Address::create([
                        'barangay_id' => $mailAddress['barangay'],
                        'zipcode' => $mailAddress['zipCode'],
                        'street' => $mailAddress['street'],
                    ]);
    
                    Address_person::create([
                        'person_id' => $person->id,
                        'address_id' => $mailAdd->id,
                        'type' => 'Permanent Address',
                        'is_alsoMail' => false,
                        'house_num' => $mailAddress['houseBlockUnitNo']
                    ]);
                }
            }



            $jobTitle = Job_title::where('title',$organization['job'])->first();

            if(!$jobTitle){
                $jobTitle = Job_title::create([
                    'title' => $organization['job']
                ]);
            }

            $user = User::where('email',$organization['employeeEmail'])->first();

            if (!$user){
                $user = User::create([
                    'name' => $person->first_name,
                    'email' => $organization['employeeEmail'],
                    'password' => bcrypt($userId),
                    'role_id' => $organization['role']
                ]);
            }

            Employee::create([
                'id' => $userId,
                'person_id' => $person->id,
                'job_title_id' => $jobTitle->id,
                'user_id' => $user->id
            ]);
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
