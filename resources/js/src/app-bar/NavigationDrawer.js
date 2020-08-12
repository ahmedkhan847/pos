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
import { UserContext } from "../contexts/UserContext";

const styles = () => ({
    root: {
        width: "150"
    }
});
function NavigationDrawer({ classes }) {
    const context = useContext(AppContext);
    const userContext = useContext(UserContext);

    return userContext.user ? (
        <React.Fragment>
            <Drawer open={context.isDrawerOpen} onClose={context.toggleDrawer}>
                <List component="nav">
                    {routes
                        .filter(route => route.name)
                        .filter(route => {
                            if (!route.user_type) return true;
                            if (typeof route.user_type === "object") {
                                return route.user_type.includes(
                                    userContext.user.user_type
                                );
                            }
                            if (route.user_type === userContext.user.user_type)
                                return true;
                            return false;
                        })
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
    ) : (
        <></>
    );
}

export default withStyles(styles)(NavigationDrawer);
