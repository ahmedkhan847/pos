<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Helpers\ValidationHelper;
use App\Repositories\MenuRepository;

class MenuController extends Controller
{
    private $menuRepository;
    function __construct(MenuRepository $menuRepository)
    {
        $this->menuRepository = $menuRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ResponseHelper::prepareResult($this->menuRepository->find([]), [], "Categories");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = ValidationHelper::validateData($request->all(), "create_menu");
        if ($validator->fails()) {
            return ResponseHelper::prepareResult([], $validator->errors(), "Unable to create menu");
        }
        $menu = $this->menuRepository->create($request);
        return ResponseHelper::prepareResult($menu, [], "menu created successfully");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = ValidationHelper::validateData($request->all(), "update_menu");
        if ($validator->fails()) {
            return ResponseHelper::prepareResult([], $validator->errors(), "Unable to update menu");
        }
        $menu = $this->menuRepository->update($id, $request);
        return ResponseHelper::prepareResult($menu, [], "menu updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
