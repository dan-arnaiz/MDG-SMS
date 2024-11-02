<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $available_slots = $this->max_slots - $this->taken_slots;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'max_slots' => $this->max_slots,
            'taken_slots' => $this->taken_slots,
            'available_slots' => $available_slots,
            'is_full' => $this->is_full,    
        ];
    }
}
