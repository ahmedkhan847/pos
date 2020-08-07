import React from "react";
import Home from "../pages/home/Home";
import HomeIcon from "@material-ui/icons/Home";
import Menu from "../pages/menus/Menu";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Login from "../pages/login/Login";
import Category from "../pages/category/Category";
import CategoryIcon from "@material-ui/icons/Category";

export const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        icon: <HomeIcon />,
        isPrivate: true
    },
    {
        path: "/menu",
        name: "Menu",
        component: Menu,
        icon: <MenuBookIcon />,
        isPrivate: true
    },
    {
        path: "/login",
        component: Login,
        isPrivate: false
    },
    {
        path: "/category",
        name: "Category",
        component: Category,
        icon: <CategoryIcon />,
        isPrivate: true
    }
];
