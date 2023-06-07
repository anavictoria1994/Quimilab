import {  createContext, useContext, useState, useEffect } from "react";
import {getFirestore, collection, getDocs, deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {app} from "../app/firebase";
import {storage} from "../app/firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"

export const authcontext = createContext()

export const useAuth = () =>{
    const context = useContext(authcontext)
    return context;
}
const db = getFirestore(app);

export function AuthProviderReactivos({children}) {

    const [reactivos, setReactivos] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});

    useEffect(()=>{
        getData()
    }, [])

    const getData = async ()=>{
        try{
            const querySnapshot = await getDocs(collection(db, "reactivos")); 
            const dataDB = querySnapshot.docs.map(doc =>{
                return{
                    id: doc.id, 
                    ...doc.data()
                }
            })
            setReactivos(dataDB)
        }catch (error){
            console.log(error);
            setError(error.message);
        }
    }
    
    const addData = async (Nombre,Sinonimos,NombreIn,Cas,EstadoFi,cantidad) =>{
        try{
            const newDoc = {
                Nombre:Nombre,
                Sinonimo:Sinonimos,
                NombreIngles:NombreIn,
                Cas:Cas, 
                EstadoFisico:EstadoFi,
                CantidadR: cantidad

            }
            const docRef = doc(collection(db, "reactivos"));
            await setDoc(docRef, newDoc).then(doc => {
                console.log(doc)
                getData()
            })
            }catch(error){
                setError(error.message);
            }
    }

    const deleteData = async (reactivosid) =>{
        try{
            setLoading (prev =>({
                ...prev, deleteData:true
            }));
            const docRef = doc(db, "reactivos", reactivosid);
            await deleteDoc (docRef)
            setReactivos(reactivos.filter(item =>  item.id !== reactivosid))
            }catch(error){
                setError(error.message);
            }finally{
                setLoading (prev =>({
                    ...prev, deleteData:true
                }));
            } 
    }

    const updateData = async(reactivosid, newNombre,newSinonimos,newNombreIn,newCas,newEstadoFi, cantidad )=>{
        try{
            const docRef = doc(db, "reactivos", reactivosid);
            await updateDoc (docRef, {
                Nombre:newNombre,
                Sinonimo:newSinonimos,
                NombreIngles:newNombreIn,
                Cas:newCas, 
                EstadoFisico:newEstadoFi,
                CantidadR: cantidad

            }).then(doc => {
                console.log(doc)
                getData()
            })
            }catch(error){
                setError(error.message);
            }
    }

    
    const uploadFile = async(file, name) =>{

        try{
            const storageRef = ref(storage,`reactiactivos_hojaSeguridad/${name}`);
            await uploadBytes(storageRef,file)
            const url = await getDownloadURL(storageRef)
            return url
            }catch(error){
                setError(error.message);
            }

    }

    const updateDataHojaseguridad = async(reactivosid, hojaSe )=>{
        try{
            const docRef = doc(db, "reactivos", reactivosid);
            await updateDoc (docRef, {
                HojaSeguridad: hojaSe
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
        reactivos,
        loading,
        error,
        addData,
        getData,
        deleteData,
        updateData,
        uploadFile,
        updateDataHojaseguridad

        }}>
            {children}
        </authcontext.Provider>
    ) 
}