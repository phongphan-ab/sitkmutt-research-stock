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

        return StockLocation::where('object_id', $stockLocation->object_id)->first();
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  String $object_id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, String $object_id)
    {
        return StockLocation::where('object_id', $object_id)->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  String  $object_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, String $object_id)
    {
        $data = $request->all();

        $validationRule = [
            'title' => 'required'
        ];
        $validator = Validator::make($data, $validationRule);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $stockLocation = StockLocation::where('object_id', $object_id)->first();
        $stockLocation->update($data);
        return response($stockLocation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  String  $object_id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, String $object_id)
    {
        StockLocation::where('object_id', $object_id)->first()->delete();
        return response(null);
    }
}
