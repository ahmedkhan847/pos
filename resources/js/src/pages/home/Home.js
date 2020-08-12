import React, { useState, useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import {
    Grid,
    CardHeader,
    withStyles,
    Divider,
    Paper
} from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import { POS } from "../../service/pos";

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
    const [loading, setLoading] = useState(true);

    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.user && loading) getData();
    }, [userContext.user]);

    async function getData() {
        setLoading(true);
        try {
            const res = await POS.get("/api/order-counts");
            setData(res.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <Grid container spacing={2}>
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
