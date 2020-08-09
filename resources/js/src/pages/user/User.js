import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import { POS } from "../../service/pos";
import Add from "./Add";
import Edit from "./Edit";

function User() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) getData();
    });

    async function getData() {
        setLoading(true);
        try {
            const res = await POS.get("/api/user");
            setData(res.data.data);
            setLoading(false);
        } catch (error) {}
    }

    function Action(props) {
        switch (props.action.icon) {
            case "save":
                return <Add reload={getData} />;
            case "edit":
                return <Edit reload={getData} user={props.data} />;
            default:
                return <></>;
        }
    }
    return (
        <Grid container justify="center">
            <Grid item md={10}>
                <MaterialTable
                    title="User"
                    data={data}
                    isLoading={loading}
                    columns={[
                        {
                            title: "Name",
                            field: "name"
                        },
                        {
                            title: "Username",
                            field: "username"
                        },
                        {
                            title: "User Type",
                            field: "user_type"
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

export default User;
