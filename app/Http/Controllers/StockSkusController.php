<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

use App\Models\Stock;
use App\Models\StockLocation;
use App\Models\StockSku;
use App\Http\Resources\StockSkuResource;

class StockSkusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($stock_object_id)
    {
        $stock = Stock::where('object_id', $stock_object_id)->firstOrFail();
        return StockSkuResource::collection($stock->stock_skus()->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, String $stock_object_id)
    {
        $data = $request->all();
        $validationRule = [
            'code' => 'required',
            'price' => 'required|min:0.00',
            'location_object_id' => 'required',
            'received_at' => 'required|date|before:tomorrow'
        ];

        $validator = Validator::make($data, $validationRule);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $stockSku = new StockSku($data);
        $stockLocation = StockLocation::where('object_id', $data['location_object_id'])->firstOrFail();

        $stock = Stock::where('object_id', $stock_object_id)->firstOrFail();
        $stockSku->stock_location()->associate($stockLocation);
        $stockSku->stock()->associate($stock);
        $stockSku->save();

        return new StockSkuResource($stockSku);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StockSku  $stockSku
     * @return \Illuminate\Http\Response
     */
    public function show(StockSku $stockSku)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StockSku  $stockSku
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StockSku $stockSku)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  String  $stock_object_id
     * @return \Illuminate\Http\Response
     */
    public function destroy(String $stock_id, String $stock_object_id)
    {
        Stock::where('object_id', $stock_id)->firstOrFail()->stock_skus()->where('object_id', $stock_object_id)->firstOrFail()->delete();

        return \response(null, 204);
    }
}
