<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ScholarshipStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}

