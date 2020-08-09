<?php

namespace App\Repositories;

use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserRepository
{
    public function findById($id)
    {
        try {
            $user = User::findOrFail($id);
            return $user;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function find($where)
    {
        $users = User::where($where)->orderBy("id", "DESC")->get();
        return $users;
    }

    public function findOne($where)
    {
        $users = User::where($where)->first();
        return $users;
    }

    public function delete($id)
    {
        try {
            $user = User::findOrFail($id);
            return $user->delete();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }

    public function create($request)
    {
        DB::beginTransaction();
        $token = Str::random(32);
        $data = $request->all();
        $data['password'] = Hash::make($request->password);
        $data['api_token'] = $token;
        if ($request->hasfile("avatar")) {
            $path = $request->file('avatar')->store('avatars', "public");
            $data["avatar"] = "storage/" . $path;
        }

        $user =   User::create($data);

        DB::commit();
        return $user;
    }

    public function update($id, $request)
    {
        try {
            $user = User::findOrFail($id);
            DB::beginTransaction();
            $data = $request->except("menus");

            if ($request->password) {
                $data["password"] =  Hash::make($request->password);
            }
            if ($request->hasfile("avatar")) {

                $path = $request->file('avatar')->store('avatars', "public");
                $data["avatar"] = "storage/" . $path;
            }

            $user->update($data);

            DB::commit();
            return true;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
            return false;
        }
    }
}
