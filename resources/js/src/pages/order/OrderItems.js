import React, { useState, useEffect } from "react";
import {
    withStyles,
    TextField,
    IconButton,
    Grid,
    LinearProgress
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function item() {
    return {
        menu_id: 1,
        price: 0,
        quantity: 0
    };
}
function initializeItems(orderItems) {
    return orderItems.length > 0 ? orderItems : [item()];
}
function OrderItem({
    selectLoading,
    menus,
    orderItem,
    onChangeItem,
    index,
    addItem
}) {
    const [price, setPrice] = useState(orderItem ? orderItem.price : 0);
    const [menu, setMenu] = useState(orderItem ? orderItem.menu_id : 1);
    const [quantity, setQuantity] = useState(
        orderItem ? orderItem.quantity : 0
    );

    function onChange(event) {
        const target = event.target;
        const item = orderItem;

        if (target.name === "menu") {
            setMenu(target.value);
            item.menu_id = target.value;
        }

        if (target.name === "quantity") {
            const selectedMenu = menus
                .filter(menuItem => menuItem.value === menu)
                .pop();
            console.log(selectedMenu);
            console.log(target.value);
            setQuantity(target.value);
            item.quantity = target.value;
            item.price = parseInt(target.value) * selectedMenu.price;
            setPrice(item.price);
        }

        onChangeItem(item, index);
    }
    return (
        <Grid container spacing={1}>
            <Grid item md={4} sm={12}>
                {selectLoading ? (
                    <LinearProgress />
                ) : (
                    <TextField
                        autoFocus
                        margin="dense"
                        id="menu"
                        name="menu"
                        label="Menu"
                        fullWidth
                        select
                        onChange={onChange}
                        value={menu}
                        variant="outlined"
                    >
                        {menus.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                )}
            </Grid>

            <Grid item md={3} sm={12}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={onChange}
                    variant="outlined"
                />
            </Grid>
            <Grid item md={3} sm={12}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    value={price}
                    onChange={onChange}
                    variant="outlined"
                    disabled
                />
            </Grid>
            <Grid item md={2} sm={12}>
                <IconButton onClick={addItem} color="secondary">
                    <AddIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

function OrderItems({ selectLoading, menus, orderItems, setFinalItems }) {
    const [items, setItems] = useState(initializeItems(orderItems));
    const [time, setTime] = useState(0);

    function addItem() {
        console.log("here");
        const updatedItems = items;
        updatedItems.push(item());
        console.log(updatedItems);
        setItems(updatedItems);
        setTime(Date.now());
    }

    useEffect(() => {
        setFinalItems(items);
    }, [time]);

    function onChange(incomingItem, index) {
        const updatedItems = items;
        items[index] = incomingItem;
        setItems(updatedItems);
        setTime(Date.now());
    }

    return items.map((orderItem, index) => (
        <OrderItem
            selectLoading={selectLoading}
            menus={menus}
            orderItem={orderItem}
            onChangeItem={onChange}
            index={index}
            key={index}
            addItem={addItem}
        />
    ));
}

export default OrderItems;
