<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeStructure extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_id',
        'academic_session_id',
        'name',
        'amount',
        'due_date',
        'description',
        'is_recurring',
    ];

    protected $casts = [
        'due_date' => 'date',
        'is_recurring' => 'boolean',
    ];
}
