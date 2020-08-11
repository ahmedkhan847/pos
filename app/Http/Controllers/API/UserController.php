<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Helpers\ValidationHelper;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    private $userRepository;
    function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return ResponseHelper::prepareResult($this->userRepository->find($request->all()), [], "User created successfully");
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function loggedInUser(Request $request)
    {
        return ResponseHelper::prepareResult(["user" => $this->userRepository->findById($request->user()->id)], [], "User created successfully");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = ValidationHelper::validateData($request->all(), "create-user");
        if ($validator->fails()) {
            return ResponseHelper::prepareResult([], $validator->errors(), "Unable to create User");
        }
        $user = $this->userRepository->create($request);
        return ResponseHelper::prepareResult(["user" => $user], [], "User created successfully");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = ValidationHelper::validateData($request->all(), "login-user");
        if ($validator->fails()) {
            return ResponseHelper::prepareResult([], $validator->errors(), "Unable to create User");
        }
        $user = $this->userRepository->findOne(["username" => $request->username]);
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                return ResponseHelper::prepareResult(["user" => $user], [], "User created successfully");
            }
        }
        return ResponseHelper::prepareResult([], ["username" => "notfound"], "Unable to find User");
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
        //
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
