<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Scholarship_status;
use App\Models\Scholarship;
use App\Models\Application;
use App\Models\Subtype;
use App\Models\Student;
use App\Http\Resources\ProvinceResource;
use App\Http\Resources\ScholarshipResource;
use Illuminate\Support\Facades\Log;


class EditStudScholarshipController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statuses = Scholarship_status::all();

        $scholarships = Scholarship::select(
            'id',
            'name',
            'max_slots',
            'taken_slots',
            'is_full'
        )->get();

        return response()->json([
            'statuses' => ProvinceResource::collection($statuses),
            'scholarships' => ScholarshipResource::collection($scholarships)
        ]);
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
        try{
            $details = DB::table('applications')
            ->join('subtypes','applications.subtype_id','subtypes.id')
            ->join('scholarships','subtypes.scholarship_id','=','scholarships.id')
            ->join('students','applications.student_id','=','students.id')
            ->join('users','students.user_id','=','users.id')
            ->join('scholarship_statuses','users.scholarship_status_id','=','scholarship_statuses.id')
            ->select(
                'scholarships.name',
                'subtypes.name as type',
                'scholarship_statuses.name as status'
            )
            ->where('applications.student_id','=',$id)
            ->first();

            if (!$details) {
                return response()->json(['message' => 'No data found'], 404);
            }
        
            return response()->json([
                'scholarship' => $details->name,
                'type' => $details->type,
                'status' => $details->status
            ]);

        } catch (\Exception $e) {

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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try{
            $application = Application::where('student_id',$id)
            ->where('is_current',true)
            ->first();

            if (!$application) {
                return response()->json(['message' => 'No application found'], 404);
            }

            $subtype = Subtype::where('id',$request->subtype)->first();

            $is_full = $subtype->Scholarship->is_full;

            if(!$subtype) return response()->json(['message' => 'Scholarship doesnt exist'], 404);

            if ($is_full){
                return response()->json(['message' => 'Scholarship is full'], 404);
            }

            $student = Student::where('id',$id)->first();

            if (!$student){
                return response()->json(['message' => 'Student not found'], 404);
            }

            $application->update([
                'subtype_id' => $request->subtype
            ]);

            if ($student->user) { // Ensure user relationship exists
                $student->user->update([
                    'scholarship_status_id' => $request->status
                ]);
            } else {
                return response()->json(['message' => 'User not found for student'], 404);
            }

            DB::commit();

            return response()->json(['message' => 'Scholarship updated successfully!'], 200);

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
