import React, { useState } from "react";
import { Button } from "@material-ui/core";
import MenuDialog from "./MenuDialog";
import { POS } from "../../service/pos";

function Edit({ menu, reload }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    async function handleClick(name, category, price) {
        setLoading(true);
        try {
            await POS.put(`/api/menu/${menu.id}`, {
                name,
                price,
                category_id: category
            });
            setOpen(false);
            reload();
        } catch (error) {}
        setLoading(false);
    }
    return (
        <>
            <MenuDialog
                open={open}
                handleClose={handleClose}
                title="Edit"
                handleClick={handleClick}
                loading={loading}
                menu={menu}
            />
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Edit
            </Button>
        </>
    );
}

export default Edit;
