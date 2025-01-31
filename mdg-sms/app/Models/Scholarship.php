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

    public function benefits()
    {
        return $this->hasMany(Benefit::class);
    }

    public function qualifications()
    {
        return $this->hasMany(Qualification::class);
    }

    public function retentions()
    {
        return $this->hasMany(Retention::class);
    }

    public function subtypes()
    {
        return $this->hasMany(Subtype::class);
    }

    public function files()
    {
        return $this->belongsToMany(File::class, 'file_reqs', 'scholarship_id', 'file_id');
    }

    public static function boot()
    {
        parent::boot();

        static::saving(function ($scholarship) {
            $scholarship->is_full = $scholarship->taken_slots >= $scholarship->max_slots;
        });
    }

    public function updateIsFull()
    {
        $this->is_full = $this->taken_slots >= $this->max_slots;
        $this->save();
    }

}
