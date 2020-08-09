<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('company_name');
            $table->string('api_token', 80)
                ->unique()
                ->nullable()
                ->default(null);
            $table->enum('user_type', ["admin", "vendor", "vendor_child"])->default("vendor");
            $table->bigInteger("parent_id")->default(0);
            $table->rememberToken();
            $table->timestamps();
        });

        DB::table("users")->insert([
            [
                "name" => "Ahmed Khan",
                "username" => "admin",
                "password" => Hash::make("Ahmedkhan92"),
                "api_token" => Str::random(32),
                "user_type" => "admin"
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
