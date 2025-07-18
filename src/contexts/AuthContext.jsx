import { createContext, useState,useEffect } from "react";
import { auth } from "../config/firebase";
import { useContext } from "react";

const AuthContext = createContext();


export function AuthProvider({children}) {

    const [currentUser, setCurrentUser]= useState(null);
     const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user=>{
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}