<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Validator;

class ValidationHelper
{

    public static function validateData($data, $type)
    {
        $messages = [
            'password.regex' => 'Password must contain at least one uppercase character one lowercase character and one number (Allowed special characters $, _, -,&,@)',
            'business_phone.regex' => "Business Phone must be a valid number",
            'photos.*.mimes' => 'Only PDF, JPEG, PNG are allowed.',
            'mobile_number.regex' => "Mobile Number must be a valid number",
            'phone_number.regex' => "Phone Number must be a valid number"
        ];
        return Validator::make($data, self::validateRules($type), $messages);
    }

    public static function validateRules($data)
    {
        $rules = [
            "create-user" => [
                'name' => 'required|string|max:255',
                'username' => 'required|string|unique:users|min:5|max:150',
                'password' => 'required|string|min:6|max:20',
                'company_name' => 'string|min:6|max:20',
                'user_type' => 'required|string'
            ],
            "login-user" => [
                'username' => 'required|string|min:5|max:150',
                'password' => 'required|string|min:6|max:20'
            ],
            "create_menu" => [
                'name'   => 'required|string',
                'price'   => 'required|numeric',
                "category_id" => "required|numeric"
            ],
            "update_menu" => [
                'name'   => 'string',
                'price'   => 'numeric',
                "category_id" => "numeric"
            ],
            "create_category" => [
                'name'   => 'required|string'
            ],
            "update_category" => [
                'name'   => 'required|string'
            ],
            "create_order" => [
                'name' => 'required|string',
                "items" => 'required|array',
                "items.*.menu_id" => "required|numeric",
                "items.*.quantity" => "required|numeric",
                "items.*.price" => "required|numeric"
            ],
            "update_order" => [
                'name' => 'string',
                "items" => 'array',
                "items.*.menu_id" => "required|numeric",
                "items.*.quantity" => "required|numeric",
                "items.*.price" => "required|numeric"
            ],
            "add_order_item" => [
                "menu_id" => "required|numeric",
                "quantity" => "required|numeric",
                "price" => "required|numeric"
            ],
            "update_order_item" => [
                "menu_id" => "numeric",
                "quantity" => "numeric",
                "price" => "numeric"
            ],
        ];
        return $rules[$data];
    }
}
