import React, { useState } from "react";
import { Button, Grid, withStyles } from "@material-ui/core";
import POS from "../../service/pos";
import CategoryDialog from "./UserDialog";
const styles = () => ({
    button: {
        marginLeft: 4
    }
});
function Add({ classes, reload }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [date, setDate] = useState(Date.now());
    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    async function handleClick(post) {
        setLoading(true);
        try {
            const res = await POS.getAxios().post("/api/user", post);
            console.log(res);
            setOpen(false);
            reload();
        } catch (error) {
            setErrors(error.response.data.errors);
            setDate(Date.now());
        }
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
                date={date}
                errors={errors}
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
