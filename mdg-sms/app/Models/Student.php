<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model
{
    use HasFactory;
    use HasApiTokens, Notifiable;

    protected $fillable = ['id', 'person_id', 'prev_school_id', 'user_id', 'program_id','year_id'];

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

    public function year()
    {
        return $this->belongsTo(Year::class);
    }

    public function guardians()
    {
        return $this->belongsToMany(Guardian::class, 'guardian_relations', 'student_id', 'guardian_id');
    }

    public function siblings()
    {
        return $this->belongsToMany(Sibling::class, 'sibling_relations', 'student_id', 'sibling_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
