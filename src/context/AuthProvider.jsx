import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }){
    const [isLoggedIn, setIsLoggedIn] = useState( !!localStorage.getItem("token"));
    const [isAuthor, setIsAuthor] = useState(false);
    return (
        <AuthContext.Provider value= {{isLoggedIn, setIsLoggedIn, isAuthor, setIsAuthor}}>
        {children}
        </AuthContext.Provider>
    );
}