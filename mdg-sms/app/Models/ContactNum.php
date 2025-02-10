<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContactNum extends Model
{
    use HasFactory;

    protected $fillable = [
        'person_id',
        'title',
        'contactNum',
        'telNum',
    ];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }
}
