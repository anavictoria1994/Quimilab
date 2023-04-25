import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../app/firebase";

export const authcontext = createContext()

export const useAuth = () =>{
    const context = useContext(authcontext)
    return context;
}
export function AuthProvider ({children}){

    const signup  = async (email, password , Nombre, Apellidos, tipoDocumento, NumDocumento, Telefono, Cargo) =>{
        const  infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usurioFirebase)=>{
            return usurioFirebase;
        });
        console.log(infoUsuario);
    }

    const login =  async (email, password)=>{
        await signInWithEmailAndPassword(auth, email, password)
        .then((usurioFirebase)=>{
        return usurioFirebase;
        });
         
        
    }

    return(
        <authcontext.Provider value ={{signup, login}}>
            {children}
        </authcontext.Provider>
    )
}

