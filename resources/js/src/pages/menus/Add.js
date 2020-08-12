import React, { useState } from "react";
import { Button, Grid, withStyles } from "@material-ui/core";
import MenuDialog from "./MenuDialog";
import POS from "../../service/pos";
const styles = () => ({
    button: {
        marginLeft: 4
    }
});
function Add({ classes, reload }) {
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
            await POS.getAxios().post("/api/menu", {
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
                title="Add"
                handleClick={handleClick}
                loading={loading}
            />
            <Button
                onClick={handleOpen}
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Add
            </Button>
        </>
    );
}

export default withStyles(styles)(Add);
