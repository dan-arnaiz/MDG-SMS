<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EditStudProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'prevSchool' => $this->prevSchool,
            'prevSchoolLandline' => $this->prevSchoolLandline ?? "",
            'prevSchoolEmail' => $this->prevSchoolEmail,
            'studentNo' => $this->studentId,
            'studentEmail' => $this->studentEmail,
            'program' => $this->program,
            'year' => $this->year,
            'firstName' => $this->firstName,
            'middleName' => $this->middleName ?? "",
            'lastName' => $this->lastName,
            'suffix' => $this->suffix ?? "",
            'dob' => $this->dob
        ];
    }
}
