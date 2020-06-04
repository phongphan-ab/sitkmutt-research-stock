<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use StockPicturesResource;

class StockResource extends JsonResource
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
        $data['pictures'] = StockPictureResource::collection($this->stock_pictures);
        $data['category'] = $this->stock_category;
        return $data;
    }
}
