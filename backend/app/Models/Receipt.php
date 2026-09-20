<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_id',
        'receipt_number',
        'amount',
        'issued_at',
        'downloaded_at',
        'file_path',
    ];

    protected $casts = [
        'issued_at' => 'datetime',
        'downloaded_at' => 'datetime',
    ];

    /**
     * Get the payment.
     */
    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
