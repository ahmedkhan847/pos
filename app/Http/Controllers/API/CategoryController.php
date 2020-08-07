<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Helpers\ValidationHelper;
use App\Repositories\CategoryRepository;

class CategoryController extends Controller
{
    private $categoryRepository;
    function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ResponseHelper::prepareResult($this->categoryRepository->find(), [], "Categories");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = ValidationHelper::validateData($request->all(), "create_category");
        if ($validator->fails()) {
            return ResponseHelper::prepareResult([], $validator->errors(), "Unable to create Category");
        }
        $category = $this->categoryRepository->create($request);
        return ResponseHelper::prepareResult($category, [], "Category created successfully");
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
        $validator = ValidationHelper::validateData($request->all(), "update_category");
        if ($validator->fails()) {
            return ResponseHelper::prepareResult([], $validator->errors(), "Unable to update Category");
        }
        $category = $this->categoryRepository->update($id, $request);
        return ResponseHelper::prepareResult($category, [], "Category updated successfully");
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
