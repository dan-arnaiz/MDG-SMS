<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'max_slots', 'taken_slots', 'is_full'];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function files()
    {
        return $this->hasManyThrough(File::class,FileReq::class);
    }
}
