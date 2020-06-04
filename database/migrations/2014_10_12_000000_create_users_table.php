<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::beginTransaction();
    
        Schema::create('users', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->uuid('object_id')->unique();
            $table->string('username')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->boolean('require_password_change')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
            $table->softDeletes();
        });

        Schema::create('user_data', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->primary();
            $table->string('name_first', 64);
            $table->string('name_mid', 64)->nullable();
            $table->string('name_last', 64);
            $table->string('student_id', 11)->nullable();
            $table->string('email');
            $table->string('tel_no', 15);
            $table->string('social_line', 20)->nullable();
            $table->string('language', 8)->default('en');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->default(
                DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );

            $table->foreign('user_id')->references('id')->on('users')
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
        Schema::dropIfExists('user_data');
        Schema::dropIfExists('users');
    }
}
