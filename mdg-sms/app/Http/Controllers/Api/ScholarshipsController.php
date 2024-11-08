<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\ScholarshipResource;
use App\Http\Resources\ScholarshipProfileResource;

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
            $scholarship = Scholarship::create([
                'name' => $request['name'],
                'description' => $request['description'],
                'max_slots' => $request['max_slots'],
                'available_slots' => $request['max_slots'],
                'status' => 1
            ]);
    
            // Create subtypes
            $createdTypes = [];
            foreach ($request['types'] as $typeName) {
                $typeRecord = subtypes::create([
                    'scholarship_id' => $scholarship->id,
                    'name' => $typeName,
                    'description' => '',
                ]);
                $createdTypes[] = $typeRecord; 
            }
    
            // Create benefits
            $createdBenefits = [];
            foreach ($request['benefits'] as $benefitName) {
                $benefitRecord = benefits::create([
                    'scholarship_id' => $scholarship->id,
                    'description' => $benefitName,
                ]);
                $createdBenefits[] = $benefitRecord; // Fix here
            }
    
            // Create retentions
            $createdRetentions = [];
            foreach ($request['retentions'] as $retentionName) {
                $retentionRecord = retentions::create([
                    'scholarship_id' => $scholarship->id,
                    'description' => $retentionName,
                ]);
                $createdRetentions[] = $retentionRecord; 
            }
    
            // Create qualifications
            $createdQualifications = [];
            foreach ($request['qualifications'] as $qualificationName) {
                $qualificationRecord = qualifications::create([
                    'scholarship_id' => $scholarship->id,
                    'description' => $qualificationName,
                ]);
                $createdQualifications[] = $qualificationRecord; 
            }
    
            // Create new files
            $createdFiles = [];
            foreach ($request['newFiles'] as $newFile) {
                $fileRecord = files::create([
                    'name' => $newFile,
                    'description' => '',
                ]);
                $createdFiles[] = $fileRecord; 
            }
    
            // Associate new files with the scholarship
            foreach ($createdFiles as $relation) {
                file_reqs::create([
                    'scholarship_id' => $scholarship->id,
                    'file_id' => $relation->id,
                ]);
            }
    
            // Associate existing files with the scholarship
            foreach ($request['existingFiles'] as $relation) {
                file_reqs::create([
                    'scholarship_id' => $scholarship->id,
                    'file_id' => $relation->id,
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
                        ->join('files','file_reqs.file_id','=','scholarship_id')
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
