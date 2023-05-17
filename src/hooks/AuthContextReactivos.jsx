import {  createContext, useContext, useState, useEffect } from "react";
import {getFirestore, collection, getDocs, deleteDoc, doc, setDoc} from "firebase/firestore";
import {app} from "../app/firebase";

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
        console.log("getdata")
        getData()
    }, [])

    const getData = async ()=>{
        try{
            setLoading (prev =>({
                ...prev, getData:true
            }));
            const querySnapshot = await getDocs(collection(db, "reactivos")); 
            const dataDB = querySnapshot.docs.map(doc =>({id: doc.id, ...doc.data()}))
            console.log(dataDB)
            setReactivos(dataDB)
        }catch (error){
            console.log(error);
            setError(error.message);
        }finally{
            setLoading (prev =>({
                ...prev, getData:false
            }));
        }
    }
    
    const addData = async (Nombre,Sinonimos,NombreIn,Cas,EstadoFi,HojaSe) =>{
        try{
            setLoading (prev =>({
                ...prev, addData:true
            }));

            const newDoc = {
                Nombre:Nombre,
                Sinonimo:Sinonimos,
                NombreIngles:NombreIn,
                Cas:Cas, 
                EstadoFisico:EstadoFi,
                HojaSeguridad: HojaSe
            }
            const docRef = doc(collection(db, "reactivos"));
            await setDoc(docRef, newDoc);
            setReactivos([...reactivos, newDoc])
            }catch(error){
                setError(error.message);
            }finally{
                setLoading (prev =>({
                    ...prev, addData:false
                }));
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

    
    
    return(
        <authcontext.Provider value ={{
        reactivos,
        loading,
        error,
        addData,
        getData,
        deleteData,
        }}>
            {children}
        </authcontext.Provider>
    ) 
}