<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = ['student_id', 'employee_id', 'scholarship_id', 'term_id', 'date_filed', 'date_terminated', 'current'];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class, 'scholarship_id');
    }

    public function term()
    {
        return $this->belongsTo(Term::class, 'term_id');
    }
}
