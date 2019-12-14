<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Stock;
use App\Traits\HasUuid;

class StockCategory extends Model
{
    use HasUuid;

    protected $primaryKey = 'object_id';
    protected $keyType = 'string';
    public $incrementing = false;
    
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
        return $this->hasMany(Stock::class);
    }
}
