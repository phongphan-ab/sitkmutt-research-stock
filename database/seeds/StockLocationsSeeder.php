<?php

use Illuminate\Database\Seeder;

use App\Models\StockLocation;

class StockLocationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StockLocation::create([
            'title' => 'Central',
            'edit_prevention' => true,
            'delete_prevention' => true
        ]);
    }
}
