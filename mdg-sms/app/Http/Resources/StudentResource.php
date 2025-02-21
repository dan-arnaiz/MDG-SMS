<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $fullName = ucfirst(strtolower($this->last_name)) . ", " . ucfirst(strtolower($this->first_name));

        if (!empty($this->middle_name)) {
            $fullName .= " " . ucfirst(strtolower($this->middle_name));
        }

        if (!empty($this->suffix)) {
            $fullName .= ", " . ucfirst(strtolower($this->suffix));
        }

        return [
            'student_id' => $this->student_id, // From applications
            'full_name' => $fullName,           // From people   
            'email' => $this->email,             // From users
            'scholarship' => $this->scholarship, // From scholarships
            'type' => $this -> type,
            'program' => $this->program,  
            'status' => $this->status,           // From scholarship_statuses
            'created' => $this->created ?? null
        ];
    }
}
