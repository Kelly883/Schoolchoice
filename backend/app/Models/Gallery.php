<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image_url',
        'caption',
        'category',
        'uploaded_by',
        'uploaded_at',
        'is_featured',
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
        'is_featured' => 'boolean',
    ];
}
