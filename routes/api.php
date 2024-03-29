<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['json.response']], function () {

    Route::post('/user', "API\UserController@store");
    Route::post('/login', "API\UserController@login");

    Route::group(["middleware" => ["auth:api"]], function () {
        Route::get('/logged-user', "API\UserController@loggedInUser");
        Route::get('/print', "API\SiteController@printReciept");
        Route::get('/order-counts', 'API\OrderController@dashboard');
        Route::get('/order/complete/{id}', "API\OrderController@complete");
        Route::get('/close-timing', "API\ClosingController@index");
        Route::get('/close-timing/open', "API\ClosingController@store");
        Route::get('/close-timing/close', "API\ClosingController@update");
        Route::resource('/user', "API\UserController");
        Route::resource('/category', 'API\CategoryController');
        Route::resource('/menu', 'API\MenuController');
        Route::resource('/order', 'API\OrderController');
    });
});
