<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Stock;
use App\Traits\HasUuid;

class StockPicture extends Model
{
    use HasUuid;

    public $fillable = [
        'path'
    ];

    protected $hidden = [
        'id'
    ];

    public function stock() {
        return $this->belongsTo(Stock::class);
    }
}
