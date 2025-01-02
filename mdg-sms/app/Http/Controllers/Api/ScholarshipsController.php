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
        try{
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'maxSlots' => 'required|integer|min:1',
                'types' => 'array',
                'types.*' => 'string',
                'benefits' => 'array',
                'benefits.*' => 'nullable|string',
                'retentions' => 'array',
                'retentions.*' => 'nullable|string',
                'qualifications' => 'array',
                'qualifications.*' => 'nullable|string',
                'newFiles' => 'array',
                'newFiles.*' => 'nullable|string',
                'existingFiles' => 'array',
                'existingFiles.*' => 'nullable|string',
            ]);
            $scholarship = Scholarship::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'max_slots' => $data['maxSlots'],
                'taken_slots' => 0,
                'is_full' => 1
            ]);
    
            // Create subtypes
            $createdTypes = [];
            foreach ($data['types'] as $typeName) {
                $typeRecord = Subtype::create([
                    'scholarship_id' => $scholarship->id,
                    'name' => $typeName,
                    'description' => '',
                ]);
                $createdTypes[] = $typeRecord; 
            }
    
            // Create benefits
            $createdBenefits = [];
            foreach ($data['benefits'] as $benefitName) {
                $benefitRecord = Benefit::create([
                    'scholarship_id' => $scholarship->id,
                    'description' => $benefitName,
                ]);
                $createdBenefits[] = $benefitRecord; // Fix here
            }
    
            // Create retentions
            $createdRetentions = [];
            foreach ($data['retentions'] as $retentionName) {
                $retentionRecord = Retention::create([
                    'scholarship_id' => $scholarship->id,
                    'description' => $retentionName,
                ]);
                $createdRetentions[] = $retentionRecord; 
            }
    
            // Create qualifications
            $createdQualifications = [];
            foreach ($data['qualifications'] as $qualificationName) {
                $qualificationRecord = Qualification::create([
                    'scholarship_id' => $scholarship->id,
                    'description' => $qualificationName,
                ]);
                $createdQualifications[] = $qualificationRecord; 
            }
    
            // Create new files
            $createdFiles = [];
            foreach ($data['newFiles'] as $newFile) {
                $fileRecord = File::create([
                    'name' => $newFile,
                    'description' => '',
                ]);
                $createdFiles[] = $fileRecord; 
            }
    
            // Associate new files with the scholarship
            foreach ($createdFiles as $relation) {    
                File_req::create([
                    'scholarship_id' => $scholarship->id,
                    'file_id' => $relation->id,
                    'is_submitted'=> 0
                ]);
            }
    
            // Associate existing files with the scholarship
            foreach ($data['existingFiles'] as $relation) {
                File_req::create([
                    'scholarship_id' => $scholarship->id,
                    'file_id' => $relation->id,
                    'is_submitted'=> 0
                ]);
            }
    
            return response()->json([
                'message' => 'Scholarship and subtypes created successfully!',
                'scholarship' => $scholarship,
                'types' => $createdTypes,
                'benefits' => $createdBenefits,
                'retentions' => $createdRetentions,
                'qualifications' => $createdQualifications,
                'files' => $createdFiles,
            ], 201);
    
        } catch (\Exception $e) {
            \Log::error($e->getMessage()); // Log the error for debugging
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
                        )
                        ->where('subtypes.scholarship_id','=',$id)
                        ->get();

            $benefits = DB::table('benefits')
                        ->select(
                            'id',
                            'description'
                        )
                        ->where('benefits.scholarship_id','=',$id)
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
                        ->join('files','file_reqs.scholarship_id','=','scholarship_id')
                        ->select(
                            'file_reqs.id',
                            'files.name',
                            'files.description'
                        )
                        ->where('file_reqs.scholarship_id','=',$id)
                        ->get();

            $students = DB::table('applications')
                        ->join('students','applications.student_id','=','students.id')
                        ->join('prev_schools','students.prev_school_id','=','prev_schools.id')
                        ->join('people','students.person_id','=','people.id')
                        ->join('programs','students.program_id','=','programs.id')
                        ->join('users','students.user_id','=','users.id')
                        ->join('scholarship_statuses','users.scholarship_status_id','=','scholarship_statuses.id')
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
                        ->where('applications.scholarship_id','=',$id)
                        ->get();
            $data = [
                'profile' => $profile,
                'types' => $types,
                'benefits' => $benefits,
                'retentions' => $retentions,
                'qualifications' => $qualifications,
                'files' => $files,
                'students' => $students,
            ];
            return new ScholarshipProfileResource($data);
                        
        }catch (\Exception $e){
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
