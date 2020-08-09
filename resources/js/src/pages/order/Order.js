import React, { useState, useEffect } from "react";
import {
    Grid,
    FormHelperText,
    IconButton,
    withStyles
} from "@material-ui/core";
import MaterialTable from "material-table";
import { POS } from "../../service/pos";
import Add from "./Add";
import Edit from "./Edit";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";

const styles = () => ({
    padding: {
        padding: 8
    }
});
function Order({ classes }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        if (loading) getData();
    });

    async function getData() {
        setLoading(true);
        try {
            const res = await POS.get("/api/order");
            setData(res.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function complete(order) {
        setLoading(true);
        try {
            await POS.get(`/order/complete/${order.id}`);
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
                        <Grid item md={2} className={classes.padding}>
                            <Edit reload={getData} order={props.data} />
                        </Grid>
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
    return (
        <Grid container>
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
                        actionsColumnIndex: -1
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(Order);
