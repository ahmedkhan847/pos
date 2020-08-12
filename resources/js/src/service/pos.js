import axios from "axios";

const token = localStorage.getItem("token");

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
    "GET,PUT,POST,DELETE,PATCH,OPTIONS";

class POSClass {
    constructor() {
        this.addBearer();
    }
    static addBearer() {
        const token = localStorage.getItem("token");
        if (token)
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    static getAxios() {
        return axios;
    }
}
const posClass = new POSClass();
export const POS = posClass.getAxios();
