import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config";

const AuthContext = createContext('');

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({name: 'bill'});
    const [error, setError] = useState(null);

    const register = async (user) => {
        console.log(user);
    };

    const login = async ({ email:identifier, pwd }) => {
        console.log(identifier, pwd);
    };

    const logout = async () => {
        console.log("logged out from the context!");
    };

    const checkLoggedInUser = async (user) => {
        console.log(user);
    };

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
