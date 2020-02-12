<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Stock;
use App\Traits\HasUuid;

class StockCategory extends Model
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


    public function stocks() {
        return $this->hasMany(Stock::class, 'category_id');
    }
}
