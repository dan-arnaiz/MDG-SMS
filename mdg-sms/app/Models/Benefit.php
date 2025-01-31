<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Benefit extends Model
{
    use HasFactory;

    protected $fillable = ['scholarship_id', 'description'];

    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }
}
