<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'recipient_id',
        'subject',
        'body',
        'read_at',
        'parent_id',
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    /**
     * Get the sender.
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * Get the recipient.
     */
    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }
}
