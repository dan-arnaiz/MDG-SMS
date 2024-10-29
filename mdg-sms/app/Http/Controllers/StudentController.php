<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    // Fetch all students
    public function index()
    {
        try {
            $students = Student::all();
            return response()->json($students, 200);
        } catch (\Exception $e) {
            Log::error('Failed to fetch students: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch students'], 500);
        }
    }

    // Fetch a single student by ID
    public function show($id)
    {
        try {
            $student = Student::findOrFail($id);
            return response()->json($student, 200);
        } catch (\Exception $e) {
            Log::error('Failed to fetch student: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch student'], 500);
        }
    }

    // Create a new student
    public function store(Request $request)
    {
        Log::info('Request Data:', $request->all());

        $validatedData = $request->validate([
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'suffix' => 'nullable|string|max:255',
            'studentId' => 'required|string|unique:students',
            'scholarship' => 'nullable|string|max:255',
            'emailaddress' => 'required|email|unique:students',
            'program' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'picture' => 'nullable|image|max:2048',
        ]);

        Log::info('Validated Data:', $validatedData);

        if ($request->hasFile('picture')) {
            $validatedData['picture'] = $request->file('picture')->storeAs('pictures', $request->file('picture')->getClientOriginalName(), 'public');
        } else {
            $validatedData['picture'] = 'pictures/default-profile-placeholder.png';
        }

        $student = Student::create($validatedData);

        return response()->json($student, 201);
    }

    // Update an existing student
    public function update(Request $request, $id)
    {
        try {
            $student = Student::findOrFail($id);

            $validatedData = $request->validate([
                'last_name' => 'required|string|max:255',
                'first_name' => 'required|string|max:255',
                'middle_name' => 'nullable|string|max:255',
                'suffix' => 'nullable|string|max:255',
                'studentId' => 'required|string|unique:students,studentId,' . $student->id,
                'scholarship' => 'nullable|string|max:255',
                'emailaddress' => 'required|email|unique:students,emailaddress,' . $student->id,
                'program' => 'required|string|max:255',
                'status' => 'required|string|max:255',
                'picture' => 'nullable|image|max:2048',
            ]);

            if ($request->hasFile('picture')) {
                $validatedData['picture'] = $request->file('picture')->storeAs('pictures', $request->file('picture')->getClientOriginalName(), 'public');
            } else {
                $validatedData['picture'] = $student->picture ?? 'pictures/default-profile-placeholder.png';
            }

            $student->update($validatedData);

            return response()->json($student, 200);
        } catch (\Exception $e) {
            Log::error('Failed to update student: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update student'], 500);
        }
    }

    // Delete a student
    public function destroy($id)
    {
        try {
            $student = Student::findOrFail($id);
            $student->delete();
            return response()->json(['message' => 'Student deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Failed to delete student: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete student'], 500);
        }
    }
}