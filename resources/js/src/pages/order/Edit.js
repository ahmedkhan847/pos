import React, { useState } from "react";
import OrderDialog from "./OrderDialog";
import POS from "../../service/pos";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

function Edit({ order, reload }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    async function handleClick(name, items) {
        setLoading(true);
        try {
            await POS.getAxios().put(`/api/order/${order.id}`, {
                name,
                items
            });
            setOpen(false);
            reload();
        } catch (error) {}
        setLoading(false);
    }
    return (
        <>
            <OrderDialog
                open={open}
                handleClose={handleClose}
                title="Edit"
                handleClick={handleClick}
                loading={loading}
                order={order}
            />
            <IconButton variant="outlined" color="primary" onClick={handleOpen}>
                <CreateIcon />
            </IconButton>
        </>
    );
}

export default Edit;
