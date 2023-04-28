import * as React from 'react';
import { useAuth } from "../context/AuthContext"



export function OpcionSalir (){
    const {logout} = useAuth();
    const handleLogout = async() =>{
        await logout()
    };
    return(
        <>
        {handleLogout}
        </>      
    )

}

