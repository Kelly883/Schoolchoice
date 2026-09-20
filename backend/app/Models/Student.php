<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'admission_number',
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'class_id',
        'parent_id',
        'admission_date',
        'status',
        'photo_url',
        'academic_session_id',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'admission_date' => 'date',
    ];

    /**
     * Get the user associated with the student.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the class the student belongs to.
     */
    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /**
     * Get the parent of the student.
     */
    public function parent()
    {
        return $this->belongsTo(ParentModel::class, 'parent_id');
    }

    /**
     * Get the student's attendance records.
     */
    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }

    /**
     * Get the student's results.
     */
    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
