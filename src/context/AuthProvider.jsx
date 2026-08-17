import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [isAuthor, setIsAuthor] = useState(false);
  const [authLoading, setIsAuthLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      const token = localStorage.getItem("token");

      if (!token){
        setIsAuthLoading(false);
        return ;
      };

      try{

          
          const response = await fetch(
              "http://localhost:8000/auth/me",
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            
            if (!response.ok) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setIsAuthor(false);
            }

            const data = await response.json();

            setIsLoggedIn(true);
            setCurrentUser(data.user);
            setIsAuthor(data.user.isAuthor);
            
        }catch(err){
            console.error(err);
        }finally{

            setIsAuthLoading(false);
        }
    }

    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isAuthor,
        setIsAuthor,
        currentUser,
        setCurrentUser,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}