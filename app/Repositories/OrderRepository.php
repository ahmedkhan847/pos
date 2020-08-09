<?php

namespace App\Repositories;

use App\Order;
use App\OrderItems;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderRepository
{
    public function findById($id)
    {
        try {
            $user = Order::with(["items.menu:id,name"])->findOrFail($id);
            return $user;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function find($where = [])
    {
        $where["user_id"] = Auth::user()->id;
        $users = Order::with(["items.menu:id,name"])->where($where)->orderBy("id", "ASC")->get();
        return $users;
    }

    public function findOne($where)
    {
        $users = Order::where($where)->first();
        return $users;
    }

    public function delete($id)
    {
        try {
            $user = Order::findOrFail($id);
            return $user->delete();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function create($request)
    {
        DB::beginTransaction();
        $data = $request->all();
        $user = Auth::user()->id;
        $data["user_id"] = $user;
        $order =  Order::create($data);

        foreach ($request->items as $items) {
            $order->items()->create($items);
        }

        DB::commit();
        return true;
    }


    public function update($id, $request)
    {
        try {
            $order = Order::findOrFail($id);
            DB::beginTransaction();
            $data = $request->all();
            $order->update($data);
            if ($request->has("items")) {

                foreach ($request->items as $items) {
                    if (isset($items["id"])) {
                        $this->updateItem($items["id"], $items);
                    } else {
                        $order->items()->create($items);
                    }
                }
            }
            DB::commit();
            return true;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function updateItem($id, $request)
    {
        try {
            $order = OrderItems::findOrFail($id);
            DB::beginTransaction();
            $data = gettype($request) === "array" ? $request : $request->all();
            $order->update($data);
            DB::commit();
            return true;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }
}
