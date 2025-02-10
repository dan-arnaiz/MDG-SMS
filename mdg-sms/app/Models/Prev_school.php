<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prev_school extends Model
{
    use HasFactory;

    protected $fillable = [ 'landline', 'name', 'email'];

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
