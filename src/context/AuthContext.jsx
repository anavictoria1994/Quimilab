import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {doc, setDoc, getFirestore} from "firebase/firestore";
import {auth} from "../app/firebase";
import {app} from "../app/firebase";

export const authcontext = createContext()

export const useAuth = () =>{
    const context = useContext(authcontext)
    return context;
}

const firestore = getFirestore(app);
export function AuthProvider ({children}){
    
    const signup  = async (email, password , Nombre, Apellidos, tipoDocumento, NumDocumento, Telefono, Cargo) =>{
        const  infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usurioFirebase)=>{
            return usurioFirebase;
        });
        console.log(infoUsuario.user.uid);
        const docuRef = doc(firestore, `generadores/${infoUsuario.user.uid}`);
        setDoc(docuRef,{nombre: Nombre, apellidos:Apellidos, tipoDocumento:tipoDocumento, numDocumento: NumDocumento, telefono: Telefono, cargo:Cargo});
    }

    const login =  async (email, password)=>{
        await signInWithEmailAndPassword(auth, email, password)
        .then((usurioFirebase)=>{
        return usurioFirebase;
        });
    }

    const loginWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup (auth,googleProvider)
    }

    
    
    return(
        <authcontext.Provider value ={{signup, login, loginWithGoogle}}>
            {children}
        </authcontext.Provider>
    )
}

