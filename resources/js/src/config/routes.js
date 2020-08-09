import React from "react";
import Home from "../pages/home/Home";
import HomeIcon from "@material-ui/icons/Home";
import Menu from "../pages/menus/Menu";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Login from "../pages/login/Login";
import Category from "../pages/category/Category";
import Order from "../pages/order/Order";
import CategoryIcon from "@material-ui/icons/Category";
import DescriptionIcon from "@material-ui/icons/Description";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import View from "../pages/order/View";
import User from "../pages/user/User";

export const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        icon: <HomeIcon />,
        isPrivate: true
    },
    {
        path: "/user",
        name: "User",
        component: User,
        icon: <PersonAddIcon />,
        isPrivate: true,
        user_type: "admin"
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
    },
    {
        path: "/orders",
        name: "Orders",
        component: Order,
        icon: <DescriptionIcon />,
        isPrivate: true
    },
    {
        path: "/order/:bvid",
        component: View,
        isPrivate: true
    }
];
