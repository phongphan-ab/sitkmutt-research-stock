<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Stock;
use App\Traits\HasUuid;

class StockLocation extends Model
{
    use HasUuid;
    
    protected $fillable = [
        'title',
        'description',
        'is_visible'
    ];

    protected $hidden = [
        'id'
    ];

    protected $casts = [
        'is_visible' => 'boolean',
    ];
}
