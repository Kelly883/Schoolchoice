<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_id',
        'document_type',
        'file_path',
        'file_name',
        'file_size',
        'mime_type',
        'uploaded_at',
        'verified_by',
        'verified_at',
        'verification_status',
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
        'verified_at' => 'datetime',
    ];

    /**
     * Get the application.
     */
    public function application()
    {
        return $this->belongsTo(Application::class);
    }
}
