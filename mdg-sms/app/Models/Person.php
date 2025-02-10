<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Person extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'dob',
        'email',
        'personalEmail',
    ];

    public function contactNumbers()
    {
        return $this->hasMany(ContactNum::class);
    }

    public function addresses()
    {
        return $this->belongsToMany(Address::class, 'address_person');
    }

    public function student()
    {
        return $this->hasOne(Student::class);
    }
}
