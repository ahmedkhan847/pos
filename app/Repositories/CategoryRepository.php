<?php

namespace App\Repositories;

use App\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CategoryRepository
{
    public function findById($id)
    {
        try {
            $user = Category::findOrFail($id);
            return $user;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function find($where = [])
    {
        $user = Auth::user();
        $user_id = $user->parent_id === 0 ? $user->id : $user->parent_id;
        $where["user_id"] = $user_id;
        $users = Category::where($where)->orderBy("id", "DESC")->get();
        return $users;
    }

    public function findOne($where)
    {
        $users = Category::where($where)->first();
        return $users;
    }

    public function delete($id)
    {
        try {
            $user = Category::findOrFail($id);
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
        Category::create($data);
        DB::commit();
        return true;
    }

    public function update($id, $request)
    {
        try {
            $user = Category::findOrFail($id);
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
