<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'class_id',
        'date',
        'status',
        'recorded_by',
        'recorded_at',
        'term_id',
    ];

    protected $casts = [
        'date' => 'date',
        'recorded_at' => 'datetime',
    ];

    /**
     * Get the student.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
