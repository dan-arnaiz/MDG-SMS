<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subtype extends Model
{
    use HasFactory;

    protected $fillable = ['name','scholarship_id', 'description'];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }
}
