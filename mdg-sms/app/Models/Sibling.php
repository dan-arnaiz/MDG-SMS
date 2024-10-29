<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sibling extends Model
{
    use HasFactory;

    protected $fillable = ['person_id', 'prev_school_id', 'age', 'edu_attain'];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function prevSchool()
    {
        return $this->belongsTo(PrevSchool::class);
    }

    public function students()
    {
        return $this->hasManyThrough(Student::class,SiblingRelation::class);
    }
}
