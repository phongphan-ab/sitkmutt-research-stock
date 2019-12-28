<?php

use Illuminate\Database\Seeder;

use App\Models\StockCategory;

class StockCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StockCategory::create([
            'title' => 'Other',
            'edit_prevention' => true,
            'delete_prevention' => true
        ]);
    }
}
