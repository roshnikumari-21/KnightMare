import { createContext, useEffect, useState } from "react";
export const commoncontext = createContext();

const ContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return null;
        }
    });
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user)); 
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);
    const value = {
        backendUrl,
        token,
        setToken,
        user,
        setUser,
    };

    return (
        <commoncontext.Provider value={value}>
            {props.children}
        </commoncontext.Provider>
    );
};

export default ContextProvider;