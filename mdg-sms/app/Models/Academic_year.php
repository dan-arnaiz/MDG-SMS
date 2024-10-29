<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Academic_year extends Model
{
    use HasFactory;

    protected $fillable = ['start_year', 'end_year'];

    public function terms()
    {
        return $this->hasMany(Term::class);
    }

}
