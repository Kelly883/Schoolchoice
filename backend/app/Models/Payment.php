<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'invoice_id',
        'amount',
        'currency',
        'gateway',
        'gateway_reference',
        'gateway_response',
        'status',
        'paid_at',
        'verified_at',
        'verified_by',
        'metadata',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
        'verified_at' => 'datetime',
        'metadata' => 'array',
    ];

    /**
     * Get the user who made the payment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the invoice.
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    /**
     * Get the receipt.
     */
    public function receipt()
    {
        return $this->hasOne(Receipt::class);
    }
}
