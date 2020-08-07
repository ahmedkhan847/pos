<?php

namespace App\Helpers;

class ResponseHelper
{
    public static function prepareResult($data, $errors, $message, $responseCode = 200)
    {
        $result = [
            "message" => $message,
            "status" => true,
            "data" => $data,
            "errors" => $errors
        ];


        if (!empty($errors)) {
            $result["status"] = false;
            $responseCode = $responseCode !== 200 ? $responseCode : 409;
        }

        return response()->json($result, $responseCode);

        // $result = json_encode($result, JSON_FORCE_OBJECT);
        // return response($result, $responseCode)->header('Content-Type', 'application/json');
    }
}
