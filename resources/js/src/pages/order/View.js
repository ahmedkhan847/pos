import React, { useState, useEffect, useContext } from "react";
import PrintIcon from "@material-ui/icons/Print";
import {
    Grid,
    IconButton,
    withStyles,
    Divider,
    LinearProgress,
    Typography,
    Card,
    CardContent,
    CardActions
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { POS } from "../../service/pos";
import { UserContext } from "../../contexts/UserContext";

const styles = () => ({
    item: {
        marginTop: 8
    }
});
function Order({ order, classes, print, userContext }) {
    function getUser() {
        if (!userContext.user) return "";
        if (userContext.user.user_type === "admin") return "";
        if (userContext.user.parent_id === 0)
            return userContext.user.company_name;
        else return userContext.user.parent.company_name;
    }
    return (
        <Card>
            <CardContent>
                <Grid id="order-item" container spacing={2}>
                    <Grid item md={12}>
                        <Grid container item justify="center">
                            <Typography variant="h3">{getUser()}</Typography>
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
                                    Rs. {row.price}
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
                                Rs. {order.total_amount}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <IconButton variant="outlined" onClick={print}>
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
    const userContext = useContext(UserContext);
    useEffect(() => {
        if (loading && userContext.user) getData();
    }, [bvid, userContext.user]);

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

    async function print() {
        setLoading(true);
        try {
            const res = await POS.get(`/api/print`, {
                params: {
                    order_id: bvid
                }
            });
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
                    <Order
                        order={order}
                        classes={classes}
                        print={print}
                        userContext={userContext}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(View);
