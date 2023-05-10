import { createContext, useContext, useEffect, useState } from "react";
import {doc, getFirestore, getDoc} from "firebase/firestore";
import {auth} from "../app/firebase";
import {app} from "../app/firebase";

export const authcontext = createContext()

export const useAuth = () =>{
    const context = useContext(authcontext)
    return context;
}
const firestore = getFirestore(app);

export function AuthProvider ({children}){
    
    const [reactivos, setReactivos] = useState(null);
    
    const getUsuData = async (uid) =>{
        const docuRef = doc(firestore, `usuarios/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const usuarioData = docuCifrada.data();
       return usuarioData;
    }
    

    useEffect(()=>{
        return;
    });
    
    return{
        
    };
         
          
    
};