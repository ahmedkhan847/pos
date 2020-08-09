import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { POS } from "../../service/pos";
import CategoryDialog from "./UserDialog";
import CreateIcon from "@material-ui/icons/Create";

function Edit({ user, reload }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    async function handleClick(name) {
        setLoading(true);
        try {
            await POS.put(`/api/user/${user.id}`, {
                name
            });
            setOpen(false);
            reload();
        } catch (error) {
            console.log(error);
        }
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
                user={user}
            />
            <IconButton variant="outlined" color="primary" onClick={handleOpen}>
                <CreateIcon />
            </IconButton>
        </>
    );
}

export default Edit;
