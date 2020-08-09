import React, { useState, useEffect } from "react";
import {
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Grid,
    LinearProgress
} from "@material-ui/core";

const styles = () => ({});

function CategoryDialog({
    handleClick,
    handleClose,
    open,
    title,
    user,
    loading,
    errors
}) {
    const [name, setName] = useState(user ? user.name : "");
    const [username, setUserName] = useState(user ? user.username : "");
    const [password, setPassword] = useState(user ? user.password : "");
    const [userType, setUserType] = useState(user ? user.user_type : "admin");

    const [companyName, setCompanyName] = useState(
        user ? user.company_name : ""
    );

    const userTypes = [
        { label: "Admin", value: "admin" },
        { label: "Vendor", value: "vendor" }
    ];
    function onChange(event) {
        const target = event.target;
        if (target.name === "name") {
            setName(target.value);
        }
        if (target.name === "password") {
            setPassword(target.value);
        }
        if (target.name === "username") {
            setUserName(target.value);
        }
        if (target.name === "userType") {
            setUserType(target.value);
        }

        if (target.name === "companyName") {
            setCompanyName(target.value);
        }
    }

    function onClick() {
        handleClick({
            name,
            username,
            user_type: userType,
            company_name: companyName,
            password
        });
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">{title} User</DialogTitle>
            <DialogContent>
                {loading ? (
                    <LinearProgress />
                ) : (
                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                value={name}
                                onChange={onChange}
                                variant="outlined"
                                required
                                error={errors && errors.name ? true : false}
                                helperText={
                                    errors && errors.name ? errors.name[0] : ""
                                }
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                name="username"
                                label="Username"
                                fullWidth
                                value={username}
                                onChange={onChange}
                                variant="outlined"
                                error={errors && errors.username ? true : false}
                                helperText={
                                    errors && errors.username
                                        ? errors.username[0]
                                        : ""
                                }
                            />
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="userType"
                                name="userType"
                                label="User Type"
                                fullWidth
                                select
                                onChange={onChange}
                                value={userType}
                                variant="outlined"
                                error={
                                    errors && errors.user_type ? true : false
                                }
                                helperText={
                                    errors && errors.user_type
                                        ? errors.user_type[0]
                                        : ""
                                }
                            >
                                {userTypes.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        {userType === "vendor" ? (
                            <Grid item md={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="companyName"
                                    name="companyName"
                                    label="Company Name"
                                    fullWidth
                                    value={companyName}
                                    onChange={onChange}
                                    variant="outlined"
                                    error={
                                        errors && errors.user_type
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors && errors.user_type
                                            ? errors.user_type[0]
                                            : ""
                                    }
                                />
                            </Grid>
                        ) : (
                            <></>
                        )}
                        <Grid item md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                name="password"
                                label="Password"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={onChange}
                                variant="outlined"
                                error={
                                    errors && errors.user_type ? true : false
                                }
                                helperText={
                                    errors && errors.user_type
                                        ? errors.user_type[0]
                                        : ""
                                }
                            />
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    color="primary"
                    onClick={onClick}
                >
                    {user ? "Update" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withStyles(styles)(CategoryDialog);
