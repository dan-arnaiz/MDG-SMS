<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prev_school extends Model
{
    use HasFactory;

    protected $fillable = ['address_id', 'landline', 'name', 'email'];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function siblings()
    {
        return $this->hasMany(Sibling::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
