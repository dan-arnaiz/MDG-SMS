<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'person_id', 'prev_school_id', 'user_id', 'program_id'];

    protected $primaryKey = 'id';

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function prevSchool()
    {
        return $this->belongsTo(PrevSchool::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function guardians()
    {
        return $this->hasManyThrough(Guardian::class,GuardianRelation::class);
    }

    public function siblings()
    {
        return $this->hasManyThrough(Sibling::class,SiblingRelation::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
