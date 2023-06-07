import { createContext, useContext, useState, useEffect } from "react";
import {getFirestore, collection, getDocs, deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {app} from "../app/firebase";
import {storage} from "../app/firebase";
import {ref, uploadBytes} from "firebase/storage"

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
    
    const addData = async (Nombre,Sinonimos,NombreIn,Cas,EstadoFi,HojaSe, Cantidad) =>{
        try{
            const newDoc = {
                Nombre:Nombre,
                Sinonimo:Sinonimos,
                NombreIngles:NombreIn,
                Cas:Cas, 
                EstadoFisico:EstadoFi,
                HojaSeguridad: HojaSe,
                CantidadR:Cantidad
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

    const updateData = async(reactivosid, nombreReactivo,SinonimosReactivo,NombreInReactivo,CasReactivo,EstadoFiReactivo,HojaSeReactivo )=>{
        try{
            const docRef = doc(db, "reactivos", reactivosid);
            await updateDoc (docRef, {
                Nombre:nombreReactivo,
                Sinonimo:SinonimosReactivo,
                NombreIngles:NombreInReactivo,
                Cas:CasReactivo, 
                EstadoFisico:EstadoFiReactivo,
                HojaSeguridad: HojaSeReactivo
            }).then(doc => {
                console.log(doc)
                getData()
            })
            }catch(error){
                setError(error.message);
            }
    }
    
    const uploadFile = async(file,name) =>{
        const storageRef = ref(storage,`reactiactivos_hojaSeguridad/${name}`);
        uploadBytes(storageRef,file).then(snapchot =>{
            console.log(snapchot)
        })
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
        uploadFile
        }}>
            {children}
        </authcontext.Provider>
    ) 
}