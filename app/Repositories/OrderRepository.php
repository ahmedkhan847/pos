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

    public function find($request)
    {
        $where = [];
        $user = Auth::user();
        $user_id = $user->parent_id === 0 ? $user->id : $user->parent_id;
        $where["user_id"] = $user_id;
        $users = Order::with(["items.menu:id,name"])->where($where);

        $users->when($request->name, function ($query, $name) {
            return $query->where("name", "like", "%$name%");
        });
        if (isset($request->date_from) && isset($request->date_to)) {
            $users->whereBetween("created_at", [$request->date_from . " 00:00:00", $request->date_to . " 23:59:59"]);
        }

        return $users->orderBy("id", "ASC")->get();
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
        $user = Auth::user();
        $user_id = $user->parent_id === 0 ? $user->id : $user->parent_id;
        $data["user_id"] = $user_id;
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

    function dashboardCount()
    {
        $user = Auth::user();
        $user_id = $user->parent_id === 0 ? $user->id : $user->parent_id;

        $todayOrders = Order::selectRaw("count(id) as today")
            ->whereRaw("date(created_at) = date(NOW())")
            ->where("user_id", $user_id)
            ->first();

        $last15Days = Order::selectRaw("count(id) as fiftenDays")
            ->whereRaw("created_at BETWEEN NOW() - INTERVAL 15 DAY AND NOW()")
            ->where("user_id", $user_id)
            ->first();
        $last30Days = Order::selectRaw("count(id) as thirtyDays")
            ->whereRaw("created_at BETWEEN NOW() - INTERVAL 30 DAY AND NOW()")
            ->where("user_id", $user_id)
            ->first();

        return ["today" => $todayOrders["today"], "lastFifteen" => $last15Days["fiftenDays"], "lastThirty" => $last30Days["thirtyDays"]];
    }
}
