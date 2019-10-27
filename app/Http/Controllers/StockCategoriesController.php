<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;

use App\Models\StockCategory;

class StockCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StockCategory::all();
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

        $stockCategory = StockCategory::create($data);

        return StockCategory::find($stockCategory->object_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StockCategory  $stockCategory
     * @return \Illuminate\Http\Response
     */
    public function show(StockCategory $stockCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StockCategory  $stockCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(StockCategory $stockCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StockCategory  $stockCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StockCategory $stockCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StockCategory  $stockCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockCategory $stockCategory)
    {
        $stockCategory->delete();
        return response(null);
    }
}
