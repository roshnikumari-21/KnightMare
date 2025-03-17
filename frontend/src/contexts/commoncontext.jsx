import { createContext, useEffect, useState } from "react";
export const commoncontext = createContext();

const ContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState('')
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [token])

    const value = {
    backendUrl,setToken, token
    }
    return (
        <commoncontext.Provider value={value}>
            {props.children}
        </commoncontext.Provider>
    )
}
export default ContextProvider;