<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use StockCategory;
use App\Models\StockPicture;
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
        'id',
        'category_id'
    ];

    protected $casts = [
        'is_visible' => 'boolean',
    ];

    public function stock_category() {
        return $this->belongsTo(StockCategory::class, 'category_id');
    }

    public function stock_pictures() {
        return $this->hasMany(StockPicture::class);
    }
}
