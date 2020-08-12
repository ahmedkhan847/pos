import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
    "GET,PUT,POST,DELETE,PATCH,OPTIONS";

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        throw err;
    }
);

export const POS = axios;
