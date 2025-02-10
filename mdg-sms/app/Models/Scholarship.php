<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'max_slots', 'taken_slots', 'is_full'];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function benefits()
    {
        return $this->hasMany(Benefit::class);
    }

    public function qualifications()
    {
        return $this->hasMany(Qualification::class);
    }

    public function retentions()
    {
        return $this->hasMany(Retention::class);
    }

    public function subtypes()
    {
        return $this->hasMany(Subtype::class);
    }

    public function files()
    {
        return $this->hasManyThrough(File::class,FileReq::class);
    }
    
    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
