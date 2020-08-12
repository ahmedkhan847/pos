import React, { useState, useEffect } from "react";
import { UserProvider } from "../contexts/UserContext";
import POS from "../service/pos";
import { useHistory } from "react-router-dom";

function UserContainer({ children }) {
    const [user, setUser] = useState(null);
    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUser();
        }
    }, []);

    async function getUser() {
        const res = await POS.getAxios().get("/api/logged-user");
        setUser(res.data.data.user);
    }
    function create(user) {
        localStorage.setItem("token", user.api_token);
        setUser(user);
    }

    function update(user) {
        setUser(user);
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        history.push("/login");
    }
    return (
        <UserProvider
            value={{
                user,
                create,
                update,
                logout
            }}
        >
            {children}
        </UserProvider>
    );
}

export default UserContainer;
