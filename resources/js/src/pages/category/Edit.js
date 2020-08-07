import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { POS } from "../../service/pos";
import CategoryDialog from "./CategoryDialog";

function Edit({ category, reload }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    async function handleClick(name) {
        setLoading(true);
        try {
            await POS.put(`/api/category/${category.id}`, {
                name
            });
            setOpen(false);
            reload();
        } catch (error) {}
        setLoading(false);
    }
    return (
        <>
            <CategoryDialog
                open={open}
                handleClose={handleClose}
                title="Add"
                handleClick={handleClick}
                loading={loading}
                category={category}
            />
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Edit
            </Button>
        </>
    );
}

export default Edit;
