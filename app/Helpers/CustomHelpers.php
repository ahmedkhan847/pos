<?php

namespace App\Helpers;

use App\Notification;

class CustomHelpers
{
    public static function createNotification($message, $type, $user_id)
    {
        Notification::create([
            "message" => $message,
            "type" => $type,
            "user_id" => $user_id,
        ]);
    }

    public static function readCSV($csvFile, $array)
    {

        // $csvData = file_get_contents($file);
        $file_handle = fopen($csvFile, 'r');
        $line_of_text = [];
        while (!feof($file_handle)) {

            $line_of_text[] = fgetcsv($file_handle, 0, $array['delimiter']);
        }

        fclose($file_handle);
        return $line_of_text;
    }
}
