<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['barangay', 'city', 'province', 'zipcode', 'street'];

    public function addressPersons()
    {
        return $this->hasManyThrough(Person::class,Address_person::class);
    }

    public function prevSchools()
    {
        return $this->hasOne(Prev_school::class);
    }
}
