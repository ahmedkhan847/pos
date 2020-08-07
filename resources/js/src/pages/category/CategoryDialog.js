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

const styles = () => ({});

function CategoryDialog({
    handleClick,
    handleClose,
    open,
    title,
    category,
    loading
}) {
    const [name, setName] = useState(category ? category.name : "");

    function onChange(event) {
        const target = event.target;
        if (target.name === "name") {
            setName(target.value);
        }
    }

    function onClick() {
        handleClick(name);
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">{title} Menu</DialogTitle>
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
                    {category ? "Update" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withStyles(styles)(CategoryDialog);
