import React, { useState, useContext } from "react";
import {
    Grid,
    Card,
    CardContent,
    TextField,
    CardActions,
    Button,
    CardHeader,
    Typography,
    withStyles,
    LinearProgress,
    FormHelperText
} from "@material-ui/core";
import POS from "../../service/pos";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

const styles = () => ({
    root: {
        width: 400
    }
});
function Login({ classes }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userConext = useContext(UserContext);
    const history = useHistory();
    async function login() {
        setLoading(true);
        setError(null);
        try {
            const res = await POS.getAxios().post("/api/login", {
                username,
                password
            });
            const data = res.data.data;
            userConext.create(data.user);
            history.push("/");
        } catch (error) {
            setError("Invalid Credentials");
        }
        setLoading(false);
    }
    function onChange(event) {
        const target = event.target;
        if (target.name === "password") {
            setPassword(target.value);
        }
        if (target.name === "username") {
            setUsername(target.value);
        }
    }

    function disabled() {
        return !username && !password;
    }
    return (
        <Grid container item justify="center">
            {loading ? (
                <LinearProgress />
            ) : (
                <Card className={classes.root}>
                    <CardHeader
                        title={<Typography variant="h5"> Login</Typography>}
                    />
                    <CardContent>
                        <Grid
                            container
                            justify="space-between"
                            direction="row"
                            spacing={4}
                        >
                            <Grid item md={12}>
                                <TextField
                                    name="username"
                                    placeholder="username"
                                    value={username}
                                    required
                                    fullWidth
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    name="password"
                                    placeholder="password"
                                    value={password}
                                    fullWidth
                                    required
                                    onChange={onChange}
                                    type="password"
                                />
                            </Grid>
                            {error ? (
                                <Grid item md={12}>
                                    <FormHelperText error>
                                        {error}
                                    </FormHelperText>
                                </Grid>
                            ) : (
                                <></>
                            )}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={disabled()}
                            onClick={login}
                        >
                            Login
                        </Button>
                    </CardActions>
                </Card>
            )}
        </Grid>
    );
}

export default withStyles(styles)(Login);
