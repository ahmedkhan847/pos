<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Helpers\ValidationHelper;
use App\Repositories\OrderRepository;

class OrderController extends Controller
{
    private $orderRepository;
    function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ResponseHelper::prepareResult($this->orderRepository->find([]), [], "Categories");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = ValidationHelper::validateData($request->all(), "create_order");
        if ($validator->fails()) {
            return ResponseHelper::prepareResult([], $validator->errors(), "Unable to create order");
        }
        $order = $this->orderRepository->create($request);
        return ResponseHelper::prepareResult($order, [], "order created successfully");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = $this->orderRepository->findById($id);
        return ResponseHelper::prepareResult($order, [], "order created successfully");
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
        $validator = ValidationHelper::validateData($request->all(), "update_order");
        if ($validator->fails()) {
            return ResponseHelper::prepareResult([], $validator->errors(), "Unable to update order");
        }
        $order = $this->orderRepository->update($id, $request);
        return ResponseHelper::prepareResult($order, [], "order updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function complete($id)
    {
        $this->orderRepository->update($id, ["status" => "completed"]);
        return ResponseHelper::prepareResult([], [], "order created successfully");
    }
}
