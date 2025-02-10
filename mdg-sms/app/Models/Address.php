<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['zipcode', 'street','barangay_id'];

    public function addressPersons()
    {
        return $this->hasManyThrough(Person::class,Address_person::class);
    }

    public function barangay()
    {
        return $this->hasOne(Barangay::class);
    }
}
