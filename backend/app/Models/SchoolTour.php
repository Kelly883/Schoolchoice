<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolTour extends Model
{
    use HasFactory;

    protected $table = 'school_tours';

    protected $fillable = [
        'parent_name',
        'email',
        'phone',
        'preferred_date',
        'preferred_time',
        'status',
        'notes',
    ];

    protected $casts = [
        'preferred_date' => 'date',
    ];
}
