<?php

namespace App\Repositories;

use App\Menu;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MenuRepository
{
    public function findById($id)
    {
        try {
            $user = Menu::with(["category"])->findOrFail($id);
            return $user;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function find($where)
    {
        $where["user_id"] = Auth::user()->id;
        $users = Menu::with(["category"])->where($where)->orderBy("id", "DESC")->get();
        return $users;
    }

    public function findOne($where)
    {
        $users = Menu::where($where)->first();
        return $users;
    }

    public function delete($id)
    {
        try {
            $user = Menu::findOrFail($id);
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
        Menu::create($data);
        DB::commit();
        return true;
    }

    public function update($id, $request)
    {
        try {
            $user = Menu::findOrFail($id);
            DB::beginTransaction();
            $data = $request->all();
            $user->update($data);
            DB::commit();
            return true;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }
}
