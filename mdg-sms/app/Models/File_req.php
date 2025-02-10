<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File_req extends Model
{
    use HasFactory;

    protected $fillable = ['scholarship_id', 'file_id'];

    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
