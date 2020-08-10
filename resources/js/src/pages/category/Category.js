import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import { POS } from "../../service/pos";
import Add from "./Add";
import Edit from "./Edit";
import { UserContext } from "../../contexts/UserContext";

function Category() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const userContext = useContext(UserContext);
    useEffect(() => {
        if (userContext.user && loading) getData();
    }, [userContext.user]);

    async function getData() {
        setLoading(true);
        try {
            const res = await POS.get("/api/category");
            setData(res.data.data);
            setLoading(false);
        } catch (error) {}
    }

    function Action(props) {
        switch (props.action.icon) {
            case "save":
                return <Add reload={getData} />;
            case "edit":
                return <Edit reload={getData} category={props.data} />;
            default:
                return <></>;
        }
    }
    return (
        <Grid container justify="center">
            <Grid item md={10}>
                <MaterialTable
                    title="Category"
                    data={data}
                    isLoading={loading}
                    columns={[
                        {
                            title: "Name",
                            field: "name"
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

export default Category;
