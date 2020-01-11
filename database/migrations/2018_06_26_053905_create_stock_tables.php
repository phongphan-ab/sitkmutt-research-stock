<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::beginTransaction();

        Schema::create('stock_categories', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->uuid('object_id')->unique();
            $table->string('title');
            $table->string('description')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->boolean('edit_prevention')->default(false);
            $table->boolean('delete_prevention')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
        });

        Schema::create('stocks', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->uuid('object_id')->unique();
            $table->unsignedInteger('category_id')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('is_visible')->default(true);        
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
            $table->softDeletes();

            $table->foreign('category_id')->references('id')->on('stock_categories')
                ->onUpdate('cascade')->onDelete('set null');
        });


        Schema::create('stock_pictures', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->uuid('object_id')->unique();
            $table->unsignedBigInteger('stock_id');
            $table->text('path');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
            $table->foreign('stock_id')->references('id')->on('stocks')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('stock_locations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('object_id')->unique();
            $table->string('title');
            $table->string('description')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->boolean('edit_prevention')->default(false);
            $table->boolean('delete_prevention')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
        });

        Schema::create('stock_location_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('object_id')->unique();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('location_id');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );

            $table->unique(['user_id', 'location_id']);
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('stock_locations')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('stock_sku', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->uuid('object_id')->unique();
            $table->unsignedBigInteger('stock_id');
            $table->unsignedBigInteger('location_id');
            $table->string('code')->nullable();
            $table->string('serial_no')->nullable()->unique();
            $table->text('description')->nullable();
            $table->float('price')->default(0);
            $table->string('owner')->nullable();
            $table->datetime('discarded_at')->nullable();
            $table->text('discard_reason')->nullable();
            $table->datetime('received_at');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
            $table->softDeletes();

            $table->foreign('stock_id')->references('id')->on('stocks')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('stock_locations')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('stock_cart', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->uuid('object_id')->unique();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('stock_id');
            $table->unsignedInteger('amount')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('stock_id')->references('id')->on('stocks')
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
        Schema::dropIfExists('stock_cart');
        Schema::dropIfExists('stock_sku');
        Schema::dropIfExists('stock_location_user');
        Schema::dropIfExists('stock_locations');
        Schema::dropIfExists('stock_pictures');
        Schema::dropIfExists('stocks');
        Schema::dropIfExists('stock_categories');
    }
}
