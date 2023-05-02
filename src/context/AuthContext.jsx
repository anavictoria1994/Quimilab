import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
         GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import {doc, setDoc, getFirestore,getDoc} from "firebase/firestore";
import {auth} from "../app/firebase";
import {app} from "../app/firebase";
import { useNavigate } from "react-router-dom";

export const authcontext = createContext()

export const useAuth = () =>{
    const context = useContext(authcontext)
    return context;
}

const firestore = getFirestore(app);

export function AuthProvider ({children}){
    
    const [usere, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const signup  = async (email, password , Nombre, Apellidos, tipoDocumento, NumDocumento, Telefono, Cargo, Rol) =>{
        const  infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usurioFirebase)=>{
        return usurioFirebase;
        });
        console.log(infoUsuario.user.uid);
        const docuRef = doc(firestore, `generadores/${infoUsuario.user.uid}`);
        setDoc(docuRef,{nombre: Nombre, apellidos:Apellidos, tipoDocumento:tipoDocumento, numDocumento: NumDocumento, telefono: Telefono,email: email,cargo:Cargo,rol:Rol});
    }

    const login =  async (email, password)=>{
        return await signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () =>{
        signOut(auth).then(()=> navigate("/"))
    }

    const loginWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup (auth,googleProvider)
    }

    const getRol = async (uid) =>{
        const docuRef = doc(firestore, `generadores/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data().rol;
       return infoFinal;
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            if (currentUser){
                if (currentUser?.uid !== usere?.uid)
                getRol(currentUser.uid).then((rol) => {
                    const usu = {
                        uid: currentUser.uid,
                        email: currentUser.email,
                        rol:rol,
                    };
                    setUser(usu);
                    console.log("ususrio final", usu); 
                
                    switch (usu.rol){
                        case "Administrador":
                            navigate("/Administrador")
                            break
                        case "Generador":
                            navigate("/Generador")
                            break
                        case "Operador":
                            navigate("/Operador")
                            break
                        default:
                            break
                    };

                    });
            }else{
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    },[usere, navigate]);

    
    return(
        <authcontext.Provider value ={{signup, login, usere, logout, loading, loginWithGoogle, getRol}}>
            {children}
        </authcontext.Provider>
    )
}

