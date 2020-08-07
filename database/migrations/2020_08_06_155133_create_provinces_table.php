<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProvincesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->timestamps();
        });

        DB::table("provinces")->insert([
            ["name" => "Sindh"],
            ["name" => "Punjab"],
            ["name" => "KWP"],
            ["name" => "Fatal"],
            ["name" => "Balochistan"]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('provinces');
    }
}
