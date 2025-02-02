<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sibling extends Model
{
    use HasFactory;

    protected $fillable = ['person_id', 'edu_attain'];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'sibling_relations', 'sibling_id', 'student_id');
    }
}
