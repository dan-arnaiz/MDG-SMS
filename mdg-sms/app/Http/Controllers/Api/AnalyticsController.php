<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $activeScholars = DB::table('users')
                                ->join('scholarship_statuses', 'users.scholarship_status_id', '=', 'scholarship_statuses.id')                           
                                ->where('scholarship_statuses.name', '=', 'Active')
                                ->count();
                                
            $inactiveScholars = DB::table('users')
                                  ->join('scholarship_statuses', 'users.scholarship_status_id', '=', 'scholarship_statuses.id')                           
                                  ->where(function ($query) {
                                      $query->where('scholarship_statuses.name', '=', 'Inactive')
                                            ->orWhere('scholarship_statuses.name', '=', 'Terminated');
                                  })
                                  ->count();
                                  
            $scholarships = DB::table('scholarships')->count();
            $scholarsTotal = DB::table('students')->count();
            
            $collection = collect([
                'activeScholars' => $activeScholars,
                'inactiveScholars' => $inactiveScholars,
                'scholarships' => $scholarships,
                'scholarsTotal' => $scholarsTotal
            ]);
    
            return response()->json($collection, 200);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

    }
}
