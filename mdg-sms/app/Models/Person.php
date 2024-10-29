<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'middle_name', 'suffix', 'dob', 'email'];

    public function contactNumbers()
    {
        return $this->hasMany(Contact_num::class);
    }

    public function addresses()
    {
        return $this->hasManyThrough(Address::class, Address_person::class);
    }

    public function guardians()
    {
        return $this->hasOne(Guardian::class);
    }

    public function siblings()
    {
        return $this->hasOne(Sibling::class);
    }

    public function student()
    {
        return $this->hasOne(Student::class);
    }

    public function employee()
    {
        return $this->hasOne(Employee::class);
    }

    public function getFullNameAttribute()
    {
        $fullName = "{$this->last_name}, {$this->first_name}";

        if (!empty($this->middle_name)) {
            $fullName .= " {$this->middle_name}";
        }
    
        if (!empty($this->suffix)) {
            $fullName .= ", {$this->suffix}";
        }

        return $fullName;
    }
}
