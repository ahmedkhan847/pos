import React, { useContext } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    withStyles
} from "@material-ui/core";
import { routes } from "../config/routes";
import { AppContext } from "../contexts/AppContext";
import { NavLink as Link } from "react-router-dom";

const styles = () => ({
    root: {
        width: "150"
    }
});
function NavigationDrawer({ classes }) {
    const context = useContext(AppContext);
    return (
        <React.Fragment>
            <Drawer open={context.isDrawerOpen} onClose={context.toggleDrawer}>
                <List component="nav">
                    {routes
                        .filter(route => route.name)
                        .map((route, index) => (
                            <Link to={route.path} key={index}>
                                <ListItem
                                    button
                                    divider
                                    className={classes.root}
                                >
                                    <ListItemIcon>{route.icon}</ListItemIcon>
                                    <ListItemText primary={route.name} />
                                </ListItem>
                            </Link>
                        ))}
                </List>
            </Drawer>
        </React.Fragment>
    );
}

export default withStyles(styles)(NavigationDrawer);
