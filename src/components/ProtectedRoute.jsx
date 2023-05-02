import { useAuth } from "../context/AuthContext"
import {Navigate} from "react-router-dom"; 


export function ProtectedRoute ({children}){
    const {usere, loading} = useAuth()
    if (loading) return <h1>g</h1>
    console.log(usere);
    if (!usere) return <Navigate to='/'/>
    return<>{children}</>
}