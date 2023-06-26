import {  createContext, useContext, useState, useEffect } from "react";
import {getFirestore, collection, getDocs, deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {app} from "../app/firebase";
import {auth} from "../app/firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";

export const authcontext = createContext()

export const useAuth = () =>{
    const context = useContext(authcontext)
    return context;
}
const db = getFirestore(app);

export function AuthProviderUsuarios({children}) {

    const [usuarioRegistrados, setUsuariosRegistrados] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});

    useEffect(()=>{
        getData()
    }, [])

    const getData = async ()=>{
        try{
            const querySnapshot = await getDocs(collection(db, "usuarios")); 
            const dataDB = querySnapshot.docs.map(doc =>{
                return{
                    id: doc.id, 
                    ...doc.data()
                }
            })
            setUsuariosRegistrados(dataDB)
        }catch (error){
            console.log(error);
            setError(error.message);
        }
    }
    

    const registro  = async (email, password , Nombre, Apellidos, tipoDocumento, NumDocumento, Telefono, Cargo, Rol) =>{
        const  infoUsuario = await createUserWithEmailAndPassword(auth, email, password);
        const newDoc = {
            nombre: Nombre, 
            apellidos:Apellidos, 
            tipoDocumento:tipoDocumento, 
            numDocumento: NumDocumento, 
            telefono: Telefono,
            email: email, 
            cargo:Cargo, 
            rol:Rol
        }
        const docuRef = doc(db, `usuarios/${infoUsuario.user.uid}`);
        await setDoc(docuRef,newDoc).then(doc => {
            console.log(doc)
            getData()
        });
    }

    const deleteData = async (usuriosid) =>{
        try{
            setLoading (prev =>({
                ...prev, deleteData:true
            }));
            const docRef = doc(db, "usuarios", usuriosid);
            await deleteDoc (docRef)
            setUsuariosRegistrados(usuarioRegistrados.filter(item =>  item.id !== usuriosid))
            }catch(error){
                setError(error.message);
            }finally{
                setLoading (prev =>({
                    ...prev, deleteData:true
                }));
            } 
    }

    const updateData = async(usuariosid, nombre ,apellidos,tipodocumentoUsu,documento,telefono,email,cargo, rol )=>{
        try{
            const docRef = doc(db, "usuarios", usuariosid);
            await updateDoc (docRef, {
                nombre: nombre, 
                apellidos:apellidos, 
                tipoDocumento:tipodocumentoUsu, 
                numDocumento: documento, 
                telefono: telefono,
                email: email, 
                cargo:cargo, 
                rol:rol

            }).then(doc => {
                console.log(doc)
                getData()
            })
            }catch(error){
                setError(error.message);
            }
    }

    
    
    return(
        <authcontext.Provider value ={{
        usuarioRegistrados,
        loading,
        error,
        registro,
        getData,
        deleteData,
        updateData,
       
        }}>
            {children}
        </authcontext.Provider>
    ) 
}