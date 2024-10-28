<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact_num extends Model
{
    use HasFactory;

    protected $fillable = ['person_id', 'title', 'nums'];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }
}
