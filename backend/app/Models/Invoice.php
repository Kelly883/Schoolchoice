<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'fee_structure_id',
        'amount',
        'due_date',
        'status',
        'generated_at',
        'paid_at',
        'paid_amount',
    ];

    protected $casts = [
        'due_date' => 'date',
        'generated_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    /**
     * Get the student.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the fee structure.
     */
    public function feeStructure()
    {
        return $this->belongsTo(FeeStructure::class);
    }
}
