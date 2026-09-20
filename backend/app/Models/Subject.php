<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'class_id',
        'teacher_id',
    ];

    /**
     * Get the class the subject belongs to.
     */
    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /**
     * Get the teacher of the subject.
     */
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    /**
     * Get the results for the subject.
     */
    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
