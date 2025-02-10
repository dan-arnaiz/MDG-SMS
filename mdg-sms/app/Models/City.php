<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class City extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function province()
    {
        return $this->hasOne(Province::class);
    }
    public function barangays()
    {
        return $this->hasMany(Barangay::class);
    }
}
