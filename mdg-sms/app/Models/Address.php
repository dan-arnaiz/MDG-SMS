<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'houseblockUnitNo',
        'street',
        'barangay',
        'city',
        'province',
        'zipcode',
    ];

    public function people()
    {
        return $this->belongsToMany(Person::class, 'address_person');
    }

    public function prevSchools()
    {
        return $this->hasMany(PrevSchool::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
