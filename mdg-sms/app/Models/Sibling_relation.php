<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sibling_relation extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'sibling_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function sibling()
    {
        return $this->belongsTo(Sibling::class);
    }
}
