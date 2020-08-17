<?php

namespace App\Repositories;

use App\ClosingTime;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ClosingTimeRepository
{
    public function findById($id)
    {
        try {
            $user = ClosingTime::findOrFail($id);
            return $user;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function find($where)
    {
        $user = Auth::user();
        $user_id = $user->parent_id === 0 ? $user->id : $user->parent_id;
        $where["user_id"] = $user_id;
        $users = ClosingTime::where($where)->orderBy("id", "DESC")->get();
        return $users;
    }

    public function open()
    {
        $user = Auth::user();
        $user_id = $user->parent_id === 0 ? $user->id : $user->parent_id;
        $where["user_id"] = $user_id;
        $users = ClosingTime::where($where)->orderBy("created_at", "DESC")->first();
        return $users;
    }

    public function findOne($where)
    {
        $users = ClosingTime::where($where)->first();
        return $users;
    }

    public function delete($id)
    {
        try {
            $user = ClosingTime::findOrFail($id);
            return $user->delete();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function create()
    {
        DB::beginTransaction();
        $user = Auth::user();
        $user_id = $user->parent_id === 0 ? $user->id : $user->parent_id;

        $closingTime = new ClosingTime();
        $closingTime->user_id = $user_id;
        $closingTime->save();
        DB::commit();
        return true;
    }

    public function close()
    {
        DB::beginTransaction();
        $user = Auth::user();
        $user_id = $user->parent_id === 0 ? $user->id : $user->parent_id;
        $closingTime = ClosingTime::where(["user_id" => $user_id])->orderBy("created_at", "DESC")->first();
        $closingTime->is_closed = true;
        $closingTime->save();
        DB::commit();
        return true;
    }

    public function update($id, $request)
    {
        try {
            $user = ClosingTime::findOrFail($id);
            DB::beginTransaction();
            $data = $request->all();
            $user->update($data);
            DB::commit();
            return true;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function getCurrentMonth()
    {
        $user = Auth::user();
        $user_id = $user->parent_id === 0 ? $user->id : $user->parent_id;
        $closingTime = ClosingTime::where(["user_id" => $user_id])
            ->whereRaw("MONTH(created_at) = ?", [date("m")])
            ->orderBy("created_at", "ASC")
            ->get();
        return $closingTime;
    }
}
