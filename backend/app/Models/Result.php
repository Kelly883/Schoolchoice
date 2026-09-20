<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'subject_id',
        'term_id',
        'score',
        'grade',
        'remarks',
        'published_at',
        'published_by',
        'academic_session_id',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    /**
     * Get the student.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the subject.
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
