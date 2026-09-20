<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'name',
        'section',
        'teacher_id',
        'academic_session_id',
    ];

    /**
     * Get the students in the class.
     */
    public function students()
    {
        return $this->hasMany(Student::class, 'class_id');
    }

    /**
     * Get the class teacher.
     */
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    /**
     * Get the academic session.
     */
    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }
}
