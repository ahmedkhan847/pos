<?php

namespace App\Providers;

use App\Observers\OrderItemObserver;
use App\OrderItems;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        OrderItems::observe(OrderItemObserver::class);
    }
}
