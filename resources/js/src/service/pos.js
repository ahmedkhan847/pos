import axios from "axios";

const token = localStorage.getItem("token");

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
    "GET,PUT,POST,DELETE,PATCH,OPTIONS";

if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export const POS = axios;
