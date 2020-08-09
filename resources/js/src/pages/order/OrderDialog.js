import React, { useState, useEffect } from "react";
import {
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Grid,
    LinearProgress
} from "@material-ui/core";
import { POS } from "../../service/pos";
import OrderItems from "./OrderItems";

const styles = () => ({});

function OrderDialog({
    handleClick,
    handleClose,
    open,
    title,
    order,
    loading
}) {
    const [name, setName] = useState(order ? order.name : "");
    const [items, setItems] = useState(order ? order.items : []);
    const [menus, setMenus] = useState([]);
    const [selectLoading, setSelectLoading] = useState(true);
    useEffect(() => {
        if (!open) return;
        const getData = async () => {
            try {
                const res = await POS.get("/api/menu");
                setMenus(
                    res.data.data.map(menu => ({
                        price: menu.price,
                        value: menu.id,
                        label: menu.name
                    }))
                );
                setSelectLoading(false);
            } catch (error) {
                setSelectLoading(false);
                setMenus([]);
            }
        };
        getData();
    }, [open]);

    function onChange(event) {
        const target = event.target;
        if (target.name === "name") {
            setName(target.value);
        }
    }

    function onClick() {
        handleClick(name, items);
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">{title} Order</DialogTitle>
            <DialogContent>
                {loading ? (
                    <LinearProgress />
                ) : (
                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                value={name}
                                onChange={onChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <OrderItems
                                menus={menus}
                                selectLoading={selectLoading}
                                orderItems={items}
                                setFinalItems={setItems}
                            />
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    color="primary"
                    onClick={onClick}
                >
                    {order ? "Update" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withStyles(styles)(OrderDialog);
