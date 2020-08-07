<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'name', 'category_id', 'price'
    ];

    public function category()
    {
        return $this->belongsTo("App\Category");
    }
}
