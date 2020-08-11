<?php

namespace App\Http\Controllers\API;

use App\Helpers\POSPrinter;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    function printReciept(Request $request)
    {
        $printerPos = new POSPrinter;
        $printerPos->print($request->order_id);
        return ResponseHelper::prepareResult([], [], "Printing The Receipt");
    }
}
