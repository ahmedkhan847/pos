<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Helpers\ValidationHelper;
use App\Repositories\ClosingTimeRepository;

class ClosingController extends Controller
{
    private $closeTimingRepository;
    function __construct(ClosingTimeRepository $closeTimingRepository)
    {
        $this->closeTimingRepository = $closeTimingRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ResponseHelper::prepareResult($this->closeTimingRepository->open(), [], "Categories");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->closeTimingRepository->create();
        return ResponseHelper::prepareResult([], [], "menu created successfully");
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
    public function update()
    {
        $this->closeTimingRepository->close();
        return ResponseHelper::prepareResult([], [], "menu updated successfully");
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
