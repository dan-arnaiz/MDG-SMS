<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Barangay extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }
    public function city()
    {
        return $this->hasOne(City::class);
    }
}
