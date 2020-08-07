<?php

namespace App\Observers;

use App\OrderItems;
use App\Repositories\OrderRepository;

class OrderItemObserver
{

    private function updateOrder($orderItems)
    {
        $items = OrderItems::selectRaw("SUM(price) as total_amount,SUM(quantity) as total_quantity")
            ->where("order_id", $orderItems->order_id)->get();

        $orderRepository = new OrderRepository;
        $orderRepository->update($orderItems->order_id, collect([
            "quantity" => $items[0]->total_quantity,
            "total_amount" => $items[0]->total_amount,
        ]));
    }

    /**
     * Handle the order items "created" event.
     *
     * @param  \App\OrderItems  $orderItems
     * @return void
     */
    public function created(OrderItems $orderItems)
    {
        $this->updateOrder($orderItems);
    }

    /**
     * Handle the order items "updated" event.
     *
     * @param  \App\OrderItems  $orderItems
     * @return void
     */
    public function updated(OrderItems $orderItems)
    {
        $this->updateOrder($orderItems);
    }

    /**
     * Handle the order items "deleted" event.
     *
     * @param  \App\OrderItems  $orderItems
     * @return void
     */
    public function deleted(OrderItems $orderItems)
    {
        $this->updateOrder($orderItems);
    }

    /**
     * Handle the order items "restored" event.
     *
     * @param  \App\OrderItems  $orderItems
     * @return void
     */
    public function restored(OrderItems $orderItems)
    {
        //
    }

    /**
     * Handle the order items "force deleted" event.
     *
     * @param  \App\OrderItems  $orderItems
     * @return void
     */
    public function forceDeleted(OrderItems $orderItems)
    {
        //
    }
}
