<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File_submitted extends Model
{
    use HasFactory;

    protected $fillable = ['application_id', 'name','is_submitted'];

    protected $table = 'files_submitted';

    public function application()
    {
        return $this->belongsTo(Application::class);
    }
    
}
