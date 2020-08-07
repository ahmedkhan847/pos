<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ["name", "quantity", "total_amount","status"];

    function items()
    {
        return $this->hasMany("App\OrderItems");
    }
}
