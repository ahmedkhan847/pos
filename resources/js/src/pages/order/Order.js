import React, { useState, useEffect, useContext } from "react";
import {
    Grid,
    FormHelperText,
    IconButton,
    withStyles,
    Card,
    CardContent,
    CardActions,
    Button,
    CardHeader,
    Typography,
    TextField
} from "@material-ui/core";
import MaterialTable from "material-table";
import Add from "./Add";
import Edit from "./Edit";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import POS from "../../service/pos";

const styles = () => ({
    padding: {
        padding: 8
    }
});
function Order({ classes }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toDate, setToDate] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [name, setName] = useState("");

    const history = useHistory();
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.user && loading) getData();
    }, [userContext.user]);

    async function getData() {
        setLoading(true);
        try {
            const res = await POS.getAxios().get("/api/order", {
                params: {
                    date_from: fromDate,
                    date_to: toDate,
                    name
                }
            });

            await POS.getAxios().get("/api/order-counts", {
                params: {
                    date_from: fromDate,
                    date_to: toDate,
                    name
                }
            });
            setData(res.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function complete(order) {
        setLoading(true);
        try {
            POS;
            await POS.getAxios().get(`/api/order/complete/${order.id}`, {
                params: {
                    status: "completed"
                }
            });
        } catch (error) {}

        getData();
    }

    function Action(props) {
        switch (props.action.icon) {
            case "save":
                return <Add reload={getData} />;
            case "edit":
                return (
                    <Grid container justify="center">
                        {props.data.status === "pending" ? (
                            <Grid item md={2} className={classes.padding}>
                                <Edit reload={getData} order={props.data} />
                            </Grid>
                        ) : (
                            <></>
                        )}
                        <Grid item md={2} className={classes.padding}>
                            <IconButton
                                variant="outlined"
                                onClick={() => complete(props.data)}
                            >
                                <CheckCircleOutlineIcon />
                            </IconButton>
                        </Grid>
                        <Grid
                            item
                            md={2}
                            className={classes.padding}
                            onClick={() =>
                                history.push(`/order/${props.data.id}`)
                            }
                        >
                            <IconButton variant="outlined">
                                <VisibilityIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                );
            default:
                return <></>;
        }
    }

    function onChange(event) {
        const target = event.target;
        if (target.name === "toDate") {
            setToDate(target.value);
        } else if (target.name === "fromDate") {
            setFromDate(target.value);
        } else if (target.name === "name") {
            setName(target.value);
        }
    }

    function reset() {
        setName("");
        setToDate("");
        setFromDate("");
        getData();
    }
    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Card>
                    <CardHeader
                        title={<Typography variant="h5">Search</Typography>}
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={4} sm={12}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={name}
                                    fullWidth
                                    variant="outlined"
                                    onChange={onChange}
                                    required
                                />
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <TextField
                                    id="to"
                                    name="toDate"
                                    label="To"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    onChange={onChange}
                                    required
                                />
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <TextField
                                    id="from"
                                    name="fromDate"
                                    label="From"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    onChange={onChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="flex-end" spacing={1}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={getData}
                                    disabled={loading}
                                >
                                    Search
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={reset}
                                    disabled={loading}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item md={12}>
                <MaterialTable
                    title="Orders"
                    data={data}
                    isLoading={loading}
                    columns={[
                        {
                            title: "Name",
                            field: "name",
                            width: 50
                        },
                        {
                            title: "Quantity",
                            field: "quantity",
                            width: 20
                        },
                        {
                            title: "Total Amount",
                            field: "total_amount",
                            width: 20
                        },
                        {
                            title: "Status",
                            render: data => {
                                return (
                                    <FormHelperText
                                        error={data.status === "pending"}
                                    >
                                        {data.status.toUpperCase()}
                                    </FormHelperText>
                                );
                            },
                            width: 20
                        }
                    ]}
                    actions={[
                        {
                            icon: "edit",
                            onClick: () => {}
                        },
                        {
                            icon: "save",
                            isFreeAction: true,
                            onClick: () => {}
                        }
                    ]}
                    components={{
                        Action
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        exportButton: true,
                        exportCsv: true,
                        exportAllData: true
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(Order);
