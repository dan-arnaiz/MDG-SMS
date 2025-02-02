<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    use HasFactory;

    protected $fillable = ['person_id', 'occupation','office_num'];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'guardian_relations', 'guardian_id', 'student_id');
    }
}
