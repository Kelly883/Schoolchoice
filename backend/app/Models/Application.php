<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'applicant_name',
        'applicant_email',
        'applicant_phone',
        'child_name',
        'child_dob',
        'child_gender',
        'desired_class_id',
        'status',
        'application_number',
        'submitted_at',
        'reviewed_by',
        'reviewed_at',
        'decision',
        'decision_notes',
    ];

    protected $casts = [
        'child_dob' => 'date',
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    /**
     * Get the documents for the application.
     */
    public function documents()
    {
        return $this->hasMany(ApplicationDocument::class);
    }
}
