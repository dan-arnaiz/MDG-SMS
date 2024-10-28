<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Person::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'FirstName' => 'nullable|string|max:100',
            'LastName' => 'nullable|string|max:100',
            'MiddleName' => 'nullable|string|max:100',
            'Suffix' => 'nullable|string|max:5',
            'DoB' => 'nullable|date',
            'Email' => 'nullable|string|email|max:100',
            'Picture' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate as a file
        ]);

        $data = $request->all();

        if ($request->hasFile('Picture')) {
            $path = $request->file('Picture')->store('pictures', 'public');
            $data['Picture'] = Storage::url($path); // Store the file and get the URL
        }

        $person = Person::create($data);
        return response()->json($person, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Person $person)
    {
        return $person;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Person $person)
    {
        $request->validate([
            'FirstName' => 'nullable|string|max:100',
            'LastName' => 'nullable|string|max:100',
            'MiddleName' => 'nullable|string|max:100',
            'Suffix' => 'nullable|string|max:5',
            'DoB' => 'nullable|date',
            'Email' => 'nullable|string|email|max:100',
            'Picture' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate as a file
        ]);

        $data = $request->all();

        if ($request->hasFile('Picture')) {
            // Delete the old picture if it exists
            if ($person->Picture) {
                $oldPath = str_replace('/storage', 'public', $person->Picture);
                Storage::delete($oldPath);
            }

            $path = $request->file('Picture')->store('pictures', 'public');
            $data['Picture'] = Storage::url($path); // Store the file and get the URL
        }

        $person->update($data);
        return response()->json($person, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        // Delete the picture if it exists
        if ($person->Picture) {
            $path = str_replace('/storage', 'public', $person->Picture);
            Storage::delete($path);
        }

        $person->delete();
        return response()->json(null, 204);
    }
}