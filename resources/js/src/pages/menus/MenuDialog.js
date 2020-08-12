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

const styles = () => ({});

function MenuDialog({ handleClick, handleClose, open, title, menu, loading }) {
    const [name, setName] = useState(menu ? menu.name : "");
    const [category, setCategory] = useState(menu ? menu.category_id : 1);
    const [price, setPrice] = useState(menu ? menu.price : 0);
    const [categories, setCategories] = useState([]);
    const [selectLoading, setSelectLoading] = useState(true);
    useEffect(() => {
        if (!open) return;
        const getData = async () => {
            try {
                const res = await POS.get("/api/category");
                setCategories(
                    res.data.data.map(category => ({
                        value: category.id,
                        label: category.name
                    }))
                );
                setSelectLoading(false);
            } catch (error) {
                setSelectLoading(false);
                setCategories([]);
            }
        };
        getData();
    }, [open]);

    function onChange(event) {
        const target = event.target;
        if (target.name === "name") {
            setName(target.value);
        }
        if (target.name === "category") {
            setCategory(target.value);
        }

        if (target.name === "price") {
            setPrice(target.value);
        }
    }

    function onClick() {
        handleClick(name, category, price);
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
                        <Grid item md={12}>
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
                            />
                        </Grid>
                        <Grid item md={12}>
                            {selectLoading ? (
                                <LinearProgress />
                            ) : (
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="category"
                                    name="category"
                                    label="Category"
                                    fullWidth
                                    select
                                    onChange={onChange}
                                    value={category}
                                    variant="outlined"
                                >
                                    {categories.map(option => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            )}
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
                    {menu ? "Update" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withStyles(styles)(MenuDialog);
