<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'people_id',
        'contact_nums_id',
        'programs_id',
        'semesters_id',
        'academic_years_id',
        'prev_school_id',
        'scholarships_id',
        'scholarship_statuses_id',
        'addresses_id',
    ];

    public function person()
    {
        return $this->belongsTo(Person::class, 'people_id');
    }

    public function contactNumber()
    {
        return $this->belongsTo(ContactNum::class, 'contact_nums_id');
    }

    public function program()
    {
        return $this->belongsTo(Program::class, 'programs_id');
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class, 'semesters_id');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_years_id');
    }

    public function previousSchool()
    {
        return $this->belongsTo(PrevSchool::class, 'prev_school_id');
    }

    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class, 'scholarships_id');
    }

    public function scholarshipStatus()
    {
        return $this->belongsTo(ScholarshipStatus::class, 'scholarship_statuses_id');
    }

    public function address()
    {
        return $this->belongsTo(Address::class, 'addresses_id');
    }
}
