<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ScholarshipResource;
use App\Http\Resources\ScholarshipProfileResource;
use App\Models\Subtype;
use App\Models\Benefit;
use App\Models\Retention;
use App\Models\Qualification;
use App\Models\File;
use App\Models\File_req;
use App\Models\Scholarship;
use Illuminate\Support\Facades\Log;

class ScholarshipsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $scholarships = DB::table('scholarships')
                            ->select(
                                'id',
                                'name',
                                'max_slots',
                                'taken_slots',
                                'is_full'
                            )
                            ->paginate();
                            
            return ScholarshipResource::collection($scholarships);
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

            $scholarship = Scholarship::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'max_slots' => $data['maxSlots'],
                'taken_slots' => 0,
                'is_full' => 1
            ]);

            DB::afterCommit(function () use ($scholarship, $data){
        
                // Create benefits
                $createdBenefits = [];
                foreach ($data['benefits'] as $benefitName) {
                    $benefitRecord = Subtype::create([
                        'scholarship_id' => $scholarship->id,
                        'name' => $benefitName['name'],
                        'description' => $benefitName['description']
                    ]);
                    $createdBenefits[] = $benefitRecord; // Fix here
                }
        
                // Create retentions
                $createdRetentions = [];
                foreach ($data['retentions'] as $retentionDesc) {
                    $retentionRecord = Retention::create([
                        'scholarship_id' => $scholarship->id,
                        'description' => $retentionDesc,
                    ]);
                    $createdRetentions[] = $retentionRecord; 
                }
        
                // Create qualifications
                $createdQualifications = [];
                foreach ($data['qualifications'] as $qualificationDesc) {
                    $qualificationRecord = Qualification::create([
                        'scholarship_id' => $scholarship->id,
                        'description' => $qualificationDesc,
                    ]);
                    $createdQualifications[] = $qualificationRecord; 
                }
        
                // Create new files

                foreach ($data['files'] as $newFile) {

                    $existingFile = File::where('name',$newFile['name'])
                    ->where('description',$newFile['description'])
                    ->first();

                    if($existingFile) {

                        File_req::create([
                            'scholarship_id' => $scholarship->id,
                            'file_id' => $existingFile->id
                        ]);

                    } else {

                        $files = File::create([
                            'name' => $newFile['name'],
                            'description' => $newFile['description']
                        ]);
                        
                        File_req::create([
                            'scholarship_id' => $scholarship->id,
                            'file_id' => $files->id
                        ]);

                    };                                
                };         
            }); 

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
        try{
            $profile = DB::table('scholarships')
                        ->select(
                            'name',
                            'description',
                            'max_slots',
                            'taken_slots',
                            'is_full',
                        )
                        ->where('scholarships.id','=',$id)
                        ->first();
                            
            $types = DB::table('subtypes')
                        ->select(
                            'id',
                            'name',
                            'description'
                        )
                        ->where('subtypes.scholarship_id','=',$id)
                        ->get();
            
            $retentions = DB::table('retentions')
                        ->select(
                            'id',
                            'description'
                        )
                        ->where('retentions.scholarship_id','=',$id)
                        ->get();
            
            $qualifications = DB::table('qualifications')
                        ->select(
                            'id',
                            'description'
                        )
                        ->where('qualifications.scholarship_id','=',$id)
                        ->get();
            
            $files = DB::table('file_reqs')
                    ->join('files', 'file_reqs.file_id', '=', 'files.id')
                    ->select(                         
                        'files.name',
                        'files.description'
                    )
                    ->where('file_reqs.scholarship_id', '=', $id)
                    ->get();

            $students = DB::table('applications')
                        ->join('students','applications.student_id','=','students.id')
                        ->join('prev_schools','students.prev_school_id','=','prev_schools.id')
                        ->join('people','students.person_id','=','people.id')
                        ->join('programs','students.program_id','=','programs.id')
                        ->join('users','students.user_id','=','users.id')
                        ->join('scholarship_statuses','users.scholarship_status_id','=','scholarship_statuses.id')
                        ->join('subtypes','applications.subtype_id','=','subtypes.id')
                        ->select(                         
                            'people.first_name',
                            'people.last_name',
                            'people.middle_name',
                            'people.suffix',
                            'students.id as student_id',
                            'programs.name as program',
                            'applications.date_filed',
                            'prev_schools.name as prevSchoolName',
                            'scholarship_statuses.name as status'
                        )
                        ->where('subtypes.scholarship_id','=',$id)
                        ->orderBy('prev_schools.name', 'asc')
                        ->get();
            $data = [
                'profile' => $profile,
                'types' => $types,
                'retentions' => $retentions,
                'qualifications' => $qualifications,
                'files' => $files,
                'students' => $students,
            ];
            return new ScholarshipProfileResource($data);
                        
        }catch (\Exception $e){
            Log::error('Detailed Error:', [
                'message' => $e->getMessage(), // Error message
                'file' => $e->getFile(),       // File where the error happened
                'line' => $e->getLine(),       // Line number of error
                'code' => $e->getCode(),       // Error code
                'trace' => $e->getTraceAsString() // Full stack trace
            ]);
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

            Scholarship::where('id',$id)
            ->update([
                'name' => $request['name'],
                'description' => $request['description'],
                'max_slots' => $request['maxSlots'],
                'taken_slots' => $request['taken'],
                'is_full' => $request['maxSlots'] === $request['taken'],
            ]);

            $scholarship = Scholarship::find($id);

            $scholarship->Subtypes()->delete();

            foreach ($request['benefits'] as $benefitName) {
                $benefitRecord = Subtype::create([
                    'id' => $benefitName['id'],
                    'scholarship_id' => $scholarship->id,
                    'name' => $benefitName['name'],
                    'description' => $benefitName['description']
                ]);
                $createdBenefits[] = $benefitRecord; // Fix here
            }

            $scholarship->Retentions()->delete();
    
            // Create retentions
            foreach ($request['retentions'] as $retentionDesc) {
                $retentionRecord = Retention::create([
                    'scholarship_id' => $scholarship->id,
                    'description' => $retentionDesc['text'],
                ]);
                $createdRetentions[] = $retentionRecord; 
            }

            $scholarship->Qualifications()->delete();

            // Create qualifications
            foreach ($request['qualifications'] as $qualificationDesc) {
                $qualificationRecord = Qualification::create([
                    'scholarship_id' => $scholarship->id,
                    'description' => $qualificationDesc['text'],
                ]);
                $createdQualifications[] = $qualificationRecord; 
            }

            $scholarship->files()->detach();
    
            // Create new files

            foreach ($request['files'] as $newFile) {

                $existingFile = File::where('name',$newFile['name'])
                ->where('description',$newFile['description'])
                ->first();

                if($existingFile) {

                    File_req::create([
                        'scholarship_id' => $scholarship->id,
                        'file_id' => $existingFile->id
                    ]);

                } else {

                    $files = File::create([
                        'name' => $newFile['name'],
                        'description' => $newFile['description']
                    ]);
                    
                    File_req::create([
                        'scholarship_id' => $scholarship->id,
                        'file_id' => $files->id
                    ]);

                };                                
            };

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
     * Remove the specified resource from storage.
     */
    public function destroy(Scholarship $scholarship)
    {
        $scholarship->delete();

        return response("", 204);
    }
}
