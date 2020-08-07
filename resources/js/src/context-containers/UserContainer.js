import React, { useState, useEffect } from "react";
import { UserProvider } from "../contexts/UserContext";
import { POS } from "../service/pos";

function UserContainer({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUser();
        }
    }, []);

    async function getUser() {
        const res = await POS.get("/api/user");
        setUser(res.data.data);
    }
    function create(user) {
        setUser(user);
        localStorage.setItem("token", user.api_token);
    }

    function update(user) {
        setUser(user);
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
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
