<?php

namespace App\Helpers;

use App\Repositories\OrderRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\CapabilityProfile;
use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;

class Item
{
    private $name;
    private $price;
    private $quantity;

    public function __construct($name = '', $price = '', $quantity = "")
    {
        $this->name = $name;
        $this->price = $price;
        $this->quantity = $quantity;
    }

    public function __toString()
    {
        $rightCols = 10;
        $leftCols = 38;

        $left = str_pad($this->quantity, $leftCols);
        $leftName = isset($this->name) ? str_pad($this->name, $leftCols) : "";

        $right = str_pad(
            $this->price === "Price" ? $this->price : "Rs. " . $this->price,
            $rightCols,
            ' ',
            STR_PAD_LEFT
        );
        return "$left$leftName$right\n";
    }
}

class POSPrinter
{
    function print($order_id)
    {
        try {
            $user = Auth::user();
            $user = $user->parent_id == 0 ? $user : $user->parent;
            $orderRepository = new OrderRepository();
            $order = $orderRepository->findById($order_id);
            $profile = CapabilityProfile::load("simple");
            $connector = new WindowsPrintConnector("smb://computer/printer");
            // $connector = new FilePrintConnector("foo.txt");
            $printer = new Printer($connector, $profile);
            $printer->setBarcodeHeight(40);
            $printer->setBarcodeWidth(2);
            $printer->barcode($order->id);
            $printer->feed(4);
            $printer->text("\n");
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("{$user->company_name}\n");
            $printer->text("Order Time: {$order->created_at->toDayDateTimeString()} \n");
            $printer->feed(4);
            $printer->text(new Item("Name", "Price", "Quantity"));
            foreach ($order->items as $key => $item) {
                $printer->text(new Item($item->menu->name, strval($item->price), strval($item->quantity)));
            }
            $printer->text("Total Amount: " . str_pad($order->total_amount, 80) . "\n");
            $printer->feed(4);
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("Thank you for shopping at {$user->company_name}\n");
            $printer->feed(4);
            $date = Carbon::now();
            $printer->text($date->toDayDateTimeString() . "\n");
            $printer->text("Devloped by Ahmed Khan, contact 03417098065\n");
            $printer->cut();
            $printer->pulse();
        } finally {
            $printer->close();
        }
    }

    function item($item)
    {
    }
}
