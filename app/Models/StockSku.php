<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Stock;
use App\Models\StockLocation;
use App\Traits\HasUuid;

class StockSku extends Model
{
    use HasUuid;

    protected $table = 'stock_sku';

    public $fillable = [
        'code',
        'serial_no',
        'description',
        'price',
        'owner',
        'discarded_at',
        'discard_reason',
        'received_at'
    ];

    protected $hidden = [
        'id',
        'stock_id',
        'location_id',
        'deleted_at'
    ];

    public function stock() {
        return $this->belongsTo(Stock::class);
    }

    public function stock_location() {
        return $this->belongsTo(StockLocation::class, 'location_id');
    }
}
