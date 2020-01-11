<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class StockPictureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = parent::toArray($request);
        unset($data['stock_id']);
        $data['url'] = Storage::disk('minio_download')->temporaryUrl($data['path'], now()->addHours());
        unset($data['path']);
        return $data;
    }
}
