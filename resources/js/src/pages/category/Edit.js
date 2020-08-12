import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import POS from "../../service/pos";
import CategoryDialog from "./CategoryDialog";
import CreateIcon from "@material-ui/icons/Create";

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
            await POS.getAxios().put(`/api/category/${category.id}`, {
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
                title="Edit"
                handleClick={handleClick}
                loading={loading}
                category={category}
            />
            <IconButton variant="outlined" color="primary" onClick={handleOpen}>
                <CreateIcon />
            </IconButton>
        </>
    );
}

export default Edit;
