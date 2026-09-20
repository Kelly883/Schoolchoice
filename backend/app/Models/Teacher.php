<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone',
        'qualification',
        'subject_id',
        'employment_date',
        'status',
    ];

    protected $casts = [
        'employment_date' => 'date',
    ];

    /**
     * Get the user associated with the teacher.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the classes taught by the teacher.
     */
    public function classes()
    {
        return $this->belongsToMany(SchoolClass::class, 'class_teacher');
    }
}
