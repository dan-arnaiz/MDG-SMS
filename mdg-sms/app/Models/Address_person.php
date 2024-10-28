<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address_person extends Model
{
    use HasFactory;

    protected $fillable = ['person_id', 'address_id', 'type', 'house_num'];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
}