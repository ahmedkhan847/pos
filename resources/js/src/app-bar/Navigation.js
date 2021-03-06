import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { AppContext } from "../contexts/AppContext";
import NavigationDrawer from "./NavigationDrawer";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: "100%"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

export default function Navigation() {
    const classes = useStyles();
    const context = useContext(AppContext);
    const userContext = useContext(UserContext);
    const history = useHistory();

    function login() {
        history.push("/login");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={context.toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Point Of Sale System
                    </Typography>
                    {userContext.user ? (
                        <Button color="inherit" onClick={userContext.logout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={login}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <NavigationDrawer />
        </div>
    );
}
