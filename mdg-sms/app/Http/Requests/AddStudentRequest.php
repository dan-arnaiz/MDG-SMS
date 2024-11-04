<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'suffix' => 'nullable|string|max:10',
            'dob' => 'required|date',
            'email' => 'required|email|unique:users,email',
            'personal_email' => 'nullable|email',
            'mobile_num' => 'nullable|string|max:15',
            'program_id' => 'required|exists:programs,id',
            'scholarship_id' => 'nullable|exists:scholarships,id',
            'scholarship_status_id' => 'required|exists:scholarship_statuses,id',
            'address' => 'nullable|array',
            'address.house_block_unit_no' => 'nullable|string|max:255',
            'address.street' => 'nullable|string|max:255',
            'address.barangay' => 'nullable|string|max:255',
            'address.city' => 'nullable|string|max:255',
            'address.municipality' => 'nullable|string|max:255',
            'address.zip_code' => 'nullable|string|max:10',
        ];
    }
}