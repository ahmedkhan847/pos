import React, { useState, useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import {
    Grid,
    CardHeader,
    withStyles,
    Divider,
    Paper,
    Button
} from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import { POS } from "../../service/pos";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const styles = () => ({
    root: {
        minWidth: 275
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 20,
        backgroundColor: "#1976d2",
        color: "#FFFF"
    },
    pos: {
        marginBottom: 12
    },
    number: {
        textAlign: "center",
        fontSize: 80,
        color: "#00701a"
    },
    numberFifteen: {
        textAlign: "center",
        fontSize: 80,
        color: "#aa00ff"
    },
    numberThirty: {
        textAlign: "center",
        fontSize: 80,
        color: "#00bcd4"
    },
    numberPending: {
        color: "#ba000d",
        textAlign: "center",
        fontSize: 80
    },
    chart: {
        height: "100%"
    }
});

function Widget({ classes, name, number }) {
    return (
        <Paper elevation={2}>
            <Typography
                variant="subtitle1"
                className={classes.title}
                align="center"
            >
                {name}
            </Typography>
            <Divider variant="fullWidth" />
            <Typography className={classes.count}>{number}</Typography>
        </Paper>
    );
}
function Home({ classes }) {
    const [data, setData] = useState([]);
    const [closeTimig, setCloseTimig] = useState({ is_closed: true });
    const [loading, setLoading] = useState(true);
    const [disable, setDisable] = useState(true);
    const [chartConfig, setChartConfig] = useState({});
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.user && loading) {
            getData();
            getClosing();
        }
    }, [userContext.user]);

    async function getData() {
        setLoading(true);
        try {
            const res = await POS.get("/api/order-counts");
            // const seriesData = res.data.data["months"];
            console.log(res.data.data["months"]);
            setData(res.data.data);
            setChartConfig({
                chart: {
                    type: "line"
                },
                title: {
                    text: "This Month Sales"
                },
                series: [
                    {
                        name: "Orders",
                        data: res.data.data["months"]
                    }
                ],
                xAxis: {
                    categories: res.data.data["labels"]
                },
                yAxis: {
                    text: "Orders"
                }
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function getClosing() {
        setDisable(true);
        try {
            const res = await POS.get("/api/close-timing");
            if (res.data.data) setCloseTimig(res.data.data);
            setDisable(false);
        } catch (error) {
            setDisable(false);
        }
    }

    async function openCloseShop() {
        setDisable(true);
        try {
            const res = await POS.get(
                `/api/close-timing/${closeTimig.is_closed ? "open" : "close"}`
            );
            if (res.data.data)
                setCloseTimig({
                    is_closed: !closeTimig.is_closed
                });
            setDisable(false);
        } catch (error) {
            setDisable(false);
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid container item md={12} justify="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={disable}
                    onClick={openCloseShop}
                >
                    {closeTimig.is_closed ? "Open" : "Close"}
                </Button>
            </Grid>
            <Grid
                container
                item
                md={12}
                justify="center"
                className={classes.chart}
            >
                {loading ? (
                    <></>
                ) : (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartConfig}
                    />
                )}
            </Grid>
            <Grid item md={2}>
                <Widget
                    name="Pending Orders"
                    number={data.pendingOrders}
                    classes={{
                        count: classes.numberPending,
                        title: classes.title
                    }}
                />
            </Grid>
            <Grid item md={2}>
                <Widget
                    name="Today's Orders"
                    number={data.today}
                    classes={{ count: classes.number, title: classes.title }}
                />
            </Grid>
            <Grid item md={3}>
                <Widget
                    name="Last 15 Days Orders"
                    number={data.lastFifteen}
                    classes={{
                        count: classes.numberFifteen,
                        title: classes.title
                    }}
                />
            </Grid>
            <Grid item md={3}>
                <Widget
                    name="Last 30 Days Orders"
                    number={data.lastThirty}
                    classes={{
                        count: classes.numberThirty,
                        title: classes.title
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(Home);
