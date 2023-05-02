import { useAuth } from "../context/AuthContext"
import {Navigate} from "react-router-dom"; 


export function ProtectedRouteHome ({children}){
    const {usere, loading} = useAuth()
    if (loading) return <h1>g</h1>
    console.log(usere);
    if (usere) 
    switch (usere.rol){
        case "Administrador":
            return <Navigate to={"/Administrador"} />
        case "Generador":
            return <Navigate to={"/Generador"} />
        case "Operador":
            return <Navigate to={"/Operador"} />
        default:
            return<>{children}</>
    };
    return<>{children}</>
}