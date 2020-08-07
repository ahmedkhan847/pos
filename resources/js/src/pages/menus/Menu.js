import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import { POS } from "../../service/pos";
import Add from "./Add";
import Edit from "./Edit";

function Menu() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) getData();
    });

    async function getData() {
        setLoading(true);
        try {
            const res = await POS.get("/api/menu");
            setData(res.data.data);
            setLoading(false);
        } catch (error) {}
    }

    function Action(props) {
        switch (props.action.icon) {
            case "save":
                return <Add reload={getData} />;
            case "edit":
                return <Edit reload={getData} menu={props.data} />;
            default:
                return <></>;
        }
    }
    return (
        <Grid container>
            <Grid item md={12}>
                <MaterialTable
                    title="Menu"
                    data={data}
                    isLoading={loading}
                    columns={[
                        {
                            title: "Name",
                            field: "name"
                        },
                        {
                            title: "Category",
                            field: "category.name"
                        },
                        {
                            title: "Price",
                            field: "price"
                        }
                    ]}
                    actions={[
                        {
                            icon: "edit",
                            onClick: () => {}
                        },
                        {
                            icon: "save",
                            isFreeAction: true,
                            onClick: () => {}
                        }
                    ]}
                    components={{
                        Action
                    }}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default Menu;
