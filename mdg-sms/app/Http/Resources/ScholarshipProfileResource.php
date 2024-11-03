<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'profile' => [
                'name' => $this->resource['profile']->name ?? null,
                'available_slots' => $this->getAvailableSlots(),
                'max_slots' => $this->resource['profile']->max_slots ?? null,
                'taken_slots' => $this->resource['profile']->taken_slots ?? null,
                'is_full' => $this->resource['profile']->is_full ?? null,
            ],
            'types' => ($this->resource['types'] ?? collect())->map(function ($type) {
                return [
                    'id' => $type->id,
                    'text' => $type->name,
                ];
            })->toArray(),
            'benefits' => ($this->resource['benefits'] ?? collect())->map(function ($benefit) {
                return [
                    'id' => $benefit->id,
                    'text' => $benefit->description,
                ];
            })->toArray(), // Convert collection to array
            'retentions' => ($this->resource['retentions'] ?? collect())->map(function ($retention) {
                return [
                    'id' => $retention->id,
                    'text' => $retention->description,
                ];
            })->toArray(), // Convert collection to array
            'qualifications' => ($this->resource['qualifications'] ?? collect())->map(function ($qualification) {
                return [
                    'id' => $qualification->id,
                    'text' => $qualification->description,
                ];
            })->toArray(), // Convert collection to array
            'files' => ($this->resource['files'] ?? collect())->map(function ($file) {
                return [
                    'id' => $file->id,
                    'name' => $file->name,
                    'description' => $file->description ?? null, // Assuming 'description' might be nullable
                ];
            })->toArray(), // Convert collection to array
            'students' => ($this->resource['students'] ?? collect())->map(function ($student) {
                return [
                    'full_name' => $this->formatFullName($student),
                    'student_id' => $student->student_id,
                    'program' => $student->program,
                    'date_filed' => $student->date_filed,
                    'prevSchoolName' => $student->prevSchoolName,
                    'status' => $student->status,
                ];
            })->toArray(), // Convert collection to array
        ];
    }

    private function formatFullName($student)
    {
        $fullName = ucfirst(strtolower($student->first_name));

        if (!empty($student->middle_name)) {
            $fullName .= " " . ucfirst(strtolower($student->middle_name));
        }

        $fullName .= " " . ucfirst(strtolower($student->last_name));

        if (!empty($student->suffix)) {
            $fullName .= ", " . ucfirst(strtolower($student->suffix));
        }

        return $fullName;
    }

    private function getAvailableSlots(): int
    {
        return ($this->resource['profile']->max_slots ?? 0) - ($this->resource['profile']->taken_slots ?? 0);
    }
}
