import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {

    const { user }  = useSelector( (state) => state.auth)
    //console.log("USUARIO_useAlth", user)

    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        // se está autenticado ou nao
        if(user) {
           // console.log("useAuth True", user)
            setAuth(true)
        } else {
            //console.log("useAuth False", user)
            setAuth(false)
        }
        setLoading(false);  
        
    } , [user])

    return { auth, loading }
} 