<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\ScholarshipResource;

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
        //
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
