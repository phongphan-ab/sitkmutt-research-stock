<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use StockCategory;
use App\Traits\HasUuid;

class Stock extends Model
{
    use HasUuid;

    public $fillable = [
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

    public function stock_category() {
        return $this->belongsTo(StockCategory::class, 'category_id');
    }
}
