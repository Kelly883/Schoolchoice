<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentModel extends Model
{
    use HasFactory;

    protected $table = 'parents';

    protected $fillable = [
        'user_id',
        'phone',
        'address',
        'occupation',
    ];

    /**
     * Get the user associated with the parent.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the children of the parent.
     */
    public function children()
    {
        return $this->hasMany(Student::class, 'parent_id');
    }
}
