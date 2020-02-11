<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
use Str;
use Validator;

use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Models\StockCategory;
use App\Models\StockPicture;

class StocksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StockResource::collection(Stock::paginate(10));
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
            'title' => 'required',
            'category_id' => 'exists:stock_categories,object_id',
            'pictures' => 'max:9',
            'pictures.*' => 'mimetypes:image/jpeg,image/gif,image/png,image/bmp|max:40960'
        ];

        $validator = Validator::make($data, $validationRule);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $stock = StockCategory::where('object_id', $data['category_id'])->firstOrFail()->stocks()->create($data);     

        if (isset($data['pictures'])){
            foreach ($data['pictures'] as $item) {
                $path = 'stock_pictures';
                $file = Storage::disk('minio_upload')->putFile($path, $item);
                $stock->stock_pictures()->create([
                    'path' => $file
                ]);
            }
        }

        return new StockResource($stock);
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
        $stock =  Stock::where('object_id', $object_id)->firstOrFail();
        return new StockResource($stock);
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
     * @param  String $object_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, String $object_id)
    {
        $data = $request->all();
        $validationRule = [
            'title' => 'required',
            'category_id' => 'exists:stock_categories,object_id',
            'pictures' => 'max:9',
            'pictures.*' => 'mimetypes:image/jpeg,image/gif,image/png,image/bmp|max:40960'
        ];

        $validator = Validator::make($data, $validationRule);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $stock = Stock::where('object_id', $object_id)->firstOrFail();  
        $stock->update($data);
        return new StockResource($stock);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  String $object_id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $object_id)
    {
        $data = $request->all();
        $stock = Stock::where('object_id', $object_id)->firstOrFail();

        if ($stock->stock_skus()->count() > 0) {
            return response([
                'error' => [
                    'code' => 'ERR_STOCKSKU_REMAINING'
                ]
            ], 409);
        }

        $stock->delete();

        return response(null, 200);
    }
}
