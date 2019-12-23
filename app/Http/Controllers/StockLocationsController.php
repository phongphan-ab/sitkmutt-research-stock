<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;

use App\Models\StockLocation;

class StockLocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StockLocation::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $validationRule = [
            'title' => 'required'
        ];
        $validator = Validator::make($data, $validationRule);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $stockLocation = StockLocation::create($data);

        return StockLocation::find($stockLocation->object_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StockLocation  $stockLocation
     * @return \Illuminate\Http\Response
     */
    public function show(StockLocation $stockLocation)
    {
        return $stockLocation;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StockLocation  $stockLocation
     * @return \Illuminate\Http\Response
     */
    public function edit(StockLocation $stockLocation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StockLocation  $stockLocation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StockLocation $stockLocation)
    {
        $data = $request->all();

        $validationRule = [
            'title' => 'required'
        ];
        $validator = Validator::make($data, $validationRule);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $stockLocation->update($data);
        return response($stockLocation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StockLocation  $stockLocation
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockLocation $stockLocation)
    {
        $stockLocation->delete();
        return response(null);
    }
}
