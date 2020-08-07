<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    protected $fillable = ["menu_id", "quantity", "price", "order_id"];

    public function menu()
    {
        return $this->belongsTo("App\Menu");
    }
}
