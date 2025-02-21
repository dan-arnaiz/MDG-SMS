<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesResource extends JsonResource
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
            'id' => $this->id,
            'fullName' => $fullName,
            'job' => $this->job,
            'email' => $this->email
        ];
    }
}
