<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class StudentProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $age = $this->dob ? Carbon::parse($this->dob)->age : null;

        $fullName = ucfirst(strtolower($this->last_name)) . ", " . ucfirst(strtolower($this->first_name));

        if (!empty($this->middle_name)) {
            $fullName .= " " . ucfirst(strtolower($this->middle_name));
        }

        if (!empty($this->suffix)) {
            $fullName .= ", " . ucfirst(strtolower($this->suffix));
        }

        return [
            'student_id' => $this->id,
            'full_name' => $fullName,
            'program' => $this->program,           
            'dob' => $this->dob,
            'age' => $age,
            'schoolEmail' => $this->schoolEmail,
            'personalEmail' => $this->personalEmail,  
            'status' => $this->status,
            'scholarship' => $this->scholarship,
            'year' => $this->year    
        ];
    }
}
