<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\Academic_year;
use App\Models\Semester;
use App\Models\Year;

class AdminToolsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programs = Program::select('name')->get();
        $years = Year::select('name')->get();
        $academic_years = Academic_year::select('name')->get();
        $semester = Semester::select('name')->get();

        $response = [
            'programs' => $programs,
            'years' => $years,
            'academicYears' => $academic_years,
            'semesters' => $semester
        ];

        return response()->json($response);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->type === 'program'){

            try{
                Program::create([
                    'name' => $request->name
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
        if ($request->type === 'year'){

            try{
                Year::create([
                    'name' => $request->name
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
        if ($request->type === 'academicYear'){

            try{
                Academic_year::create([
                    'name' => $request->name
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
        if ($request->type === 'semester'){

            try{
                Semester::create([
                    'name' => $request->name
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
    public function destroy(string $id, Request $request)
    {
        if($request->input('type') === 'program'){

            try{
                Program::where('name',$id)
                ->delete();
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
        if($request->input('type') === 'year'){

            try{
                Year::where('name',$id)
                ->delete();
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
        if($request->input('type') === 'academicYear'){

            try{
                Academic_year::where('name',$id)
                ->delete();
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
        if($request->input('type') === 'semester'){

            try{
                Semester::where('name',$id)
                ->delete();
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
    }
}
