<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\People;
use App\Models\User;
use App\Models\Student;
use App\Models\Contact_num;
use App\Models\Address_person;
use App\Models\Address;
use Illuminate\Support\Facades\Log;

class EditStudContactController
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
        $student = Student::where('id',$id)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $person = $student->Person;

        if (!$person) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $studentEmail = $student->User->email;
        $personalEmail = $person->email;

        $mobile = Contact_num::where('person_id', $person->id)
        ->where('title', 'Mobile Number')
        ->first();

        $landline= Contact_num::where('person_id', $person->id)
        ->where('title', 'Landline')
        ->first();


        $permanentAddress = DB::table('addresses')
        ->join('address_person','address_person.address_id','=','addresses.id')
        ->join('barangays','addresses.barangay_id','=','barangays.id')
        ->join('cities','barangays.city_id','=','cities.id')
        ->join('provinces','cities.province_id','=','provinces.id')
        ->select(
            'addresses.id as id',
            'address_person.house_num as permHouse',
            'addresses.street as permStreet',
            'provinces.name as provinceP',
            'cities.name as cityP',
            'barangays.name as barangayP',
            'addresses.zipcode as permZip',
            'address_person.is_alsoMail as addressSimilarity'
        )
        ->where('address_person.person_id',$person->id)
        ->where('address_person.type','Permanent Address')
        ->first();

        $mailAddress = null;

        if($permanentAddress && !$permanentAddress->addressSimilarity){

            $mailAddress = DB::table('addresses')
            ->join('address_person','address_person.address_id','=','addresses.id')
            ->join('barangays','addresses.barangay_id','=','barangays.id')
            ->join('cities','barangays.city_id','=','cities.id')
            ->join('provinces','cities.province_id','=','provinces.id')
            ->select(
                'addresses.id as id',
                'address_person.house_num as mailHouse',
                'addresses.street as mailStreet',
                'provinces.name as provinceM',
                'cities.name as cityM',
                'barangays.name as barangayM',
                'addresses.zipcode as mailZip',
            )
            ->where('address_person.person_id',$person->id)
            ->where('address_person.type','Mailing Address')
            ->first();

        }

        $response = [
            'studentEmail' => $studentEmail,
            'email' => $personalEmail,
            'mobileNum' => $mobile,
            'landline' => $landline,
            'permanentAddress' => $permanentAddress,
            'mailAddress' => $mailAddress
        ];

        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try{
            $student = Student::where('id',$id)->first();

            if (!$student) {
                response()->json(['error' => 'student not found'],400);
            }

            $person = $student->Person;

            if (!$person) {
                response()->json(['error' => 'Person not found'],400);
            }

            $person->update([
                'email' => $request->personal['email']
            ]);

            if ($student->user) {
                $student->user->update([
                    'email' => $request->personal['studentEmail']
                ]);
            }

            Contact_num::where('id',$request->personal['mobileId'])
            ->update(['nums' => $request->personal['mobileNum']]);

            if (!empty($request->personal['landlineId'])){
                Contact_num::where('id',$request->personal['landlineId'])
                ->update([
                    'nums' => $request->personal['landline']
                ]);
            };

            $existingPermAddress = Address::where('barangay_id', $request->permAddress['barangay'])
                ->where('zipcode', $request->permAddress['zipCode'])
                ->where('street', $request->permAddress['street'])
                ->first();

            if ($existingPermAddress) {
                $permAddress = $existingPermAddress;
            } else {
                $permAddress = Address::create([
                    'barangay_id' => $request->permAddress['barangay'],
                    'zipcode' => $request->permAddress['zipCode'],
                    'street' => $request->permAddress['street']
                ]);
            }

            Address_person::where('person_id',$person->id)
            ->where('address_id',$request->permAddress['id'])
            ->update([
                'house_num' => $request->permAddress['houseBlockUnitNo'],
                'address_id' => $permAddress->id,
                'is_alsoMail' => $request->sameAddress
            ]);

            if ($request->mailAddress){

                $existingMailAddress = Address::where('barangay_id', $request->mailAddress['barangay'])
                ->where('zipcode', $request->mailAddress['zipCode'])
                ->where('street', $request->mailAddress['street'])
                ->first();

                if ($existingMailAddress) {
                    $mailAddress = $existingMailAddress;
                } else {
                    $mailAddress = Address::create([
                        'barangay_id' => $request->mailAddress['barangay'],
                        'zipcode' => $request->mailAddress['zipCode'],
                        'street' => $request->mailAddress['street']
                    ]);
                }

                if ($request->mailAddress['id']){
                    Address_person::where('person_id',$person->id)
                    ->where('address_id',$request->mailAddress['id'])
                    ->update([
                        'house_num' => $request->mailAddress['houseBlockUnitNo'],
                        'address_id' => $mailAddress->id,
                    ]);
                } else{
                    Address_person::create([
                        'person_id' => $person->id,
                        'house_num' => $request->mailAddress['houseBlockUnitNo'],
                        'type' => 'Mailing Address',
                        'address_id' => $mailAddress->id,
                        'is_alsoMail' => false
                    ]);
                }

            } else $mailAddress = [];

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
