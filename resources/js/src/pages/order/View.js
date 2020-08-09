import React, { useState, useEffect } from "react";
import PrintIcon from "@material-ui/icons/Print";
import {
    Grid,
    FormHelperText,
    IconButton,
    withStyles,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Divider,
    Box,
    LinearProgress,
    Paper,
    Typography,
    Card,
    CardContent,
    CardActions
} from "@material-ui/core";

import print from "print-js";
import { useParams } from "react-router-dom";
import { POS } from "../../service/pos";

const styles = () => ({
    item: {
        marginTop: 8
    }
});
function Order({ order, classes }) {
    return (
        <Card>
            <CardContent>
                <Grid id="order-item" container spacing={2}>
                    <Grid item md={12}>
                        <Grid container item justify="center">
                            <Typography variant="h3">La More</Typography>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Grid container justify="space-between">
                            <Grid item md={10}>
                                <b>Name</b>: {order.name}
                            </Grid>
                            <Grid item md={10}>
                                <b>Number</b>: {order.id}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Divider />
                    </Grid>
                    <Grid item md={12}>
                        <Grid container spacing={1}>
                            <Grid item md={4}>
                                <Typography>Quantity</Typography>
                            </Grid>
                            <Grid item md={4}>
                                <Typography>Name</Typography>
                            </Grid>
                            <Grid item md={4}>
                                <Typography>Price</Typography>
                            </Grid>

                            <Grid item md={12}>
                                <Divider />
                            </Grid>
                        </Grid>
                        <Grid container item md={12}>
                            <Divider />
                        </Grid>
                        {order.items.map((row, index) => (
                            <Grid
                                container
                                key={index}
                                className={classes.item}
                            >
                                <Grid item md={4}>
                                    {row.quantity}
                                </Grid>
                                <Grid item md={4}>
                                    {row.menu.name}
                                </Grid>
                                <Grid item md={4}>
                                    {row.price}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item md={12}>
                        <Divider />
                    </Grid>
                    <Grid item md={12}>
                        <Grid container>
                            <Grid item md={6}>
                                Total
                            </Grid>
                            <Grid item md={6}>
                                {order.total_amount}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <IconButton variant="outlined" onClick={() => window.print()}>
                    <PrintIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
function View({ classes }) {
    const { bvid } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) getData();
    }, [bvid]);

    async function getData() {
        setLoading(true);
        try {
            const res = await POS.get(`/api/order/${bvid}`);
            setOrder(res.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <Grid container>
            <Grid item md={12}>
                {loading ? (
                    <LinearProgress />
                ) : (
                    <Order order={order} classes={classes} />
                )}
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(View);
