import { useAuth } from "../context/AuthContext"
import {Navigate} from "react-router-dom"; 


export function ProtectedRouteHome ({children}){
    const {usere, loading} = useAuth()
    if (loading) return <h1>Cargando</h1>
    console.log(usere);
    if (usere) 
    switch (usere.rol){
        case "Administrador":
            return <Navigate to={"/Administrador"} />
        case "Generador":
            return <Navigate to={"/Generador"} />
        case "Operador":
            return <Navigate to={"/Operador"} />
        case "Invitado":
            return <Navigate to={"/Invitado"} />
        default:
            return<>{children}</>
    };
    return<>{children}</>
}