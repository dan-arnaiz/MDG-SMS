<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PrevSchool extends Model
{
    use HasFactory;

    protected $fillable = [
        'address_id',
        'landline',
        'name',
        'email',
    ];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
