<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBorrowTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::beginTransaction();

        Schema::create('borrows', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->uuid('object_id')->unique();
            $table->unsignedBigInteger('user_id');
            $table->text('advisor');
            $table->datetime('borrow_at');
            $table->datetime('return_at');
            $table->text('borrowing_reason');
            $table->text('approval_reason');
            $table->dateTime('received_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
                
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('borrow_material', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->uuid('object_id')->unique();
            $table->unsignedBigInteger('borrow_id');
            $table->unsignedBigInteger('material_id');
            $table->unsignedInteger('amount')->default(1);
            $table->boolean('is_allowed')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
                
            $table->foreign('borrow_id')->references('id')->on('borrows')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('material_id')->references('id')->on('materials')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('borrow_material_sku', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->uuid('object_id')->unique();
            $table->unsignedBigInteger('borrow_material_id');
            $table->unsignedBigInteger('material_sku_id');
            $table->datetime('returned_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
            
            $table->foreign('borrow_material_id')->references('id')->on('borrow_material')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('material_sku_id')->references('id')->on('material_sku')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        DB::commit();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('borrow_material_sku');
        Schema::dropIfExists('borrow_material');
        Schema::dropIfExists('borrows');
    }
}
