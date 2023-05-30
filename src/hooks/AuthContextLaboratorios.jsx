import {  createContext, useContext, useState, useEffect } from "react";
import {getFirestore, collection, getDocs, deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {app} from "../app/firebase";

export const authcontext = createContext()

export const useAuth = () =>{
    const context = useContext(authcontext)
    return context;
}
const db = getFirestore(app);

export function AuthProviderLaboratorios({children}) {
    const [laboratorios, setLaboratorios] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});

    useEffect(()=>{
        getData()
    }, [])

    const getData = async ()=>{
        try{
            const querySnapshot = await getDocs(collection(db, "laboratorios")); 
            const dataDB = querySnapshot.docs.map(doc =>{
                return{
                    id: doc.id, 
                    ...doc.data()
                }
            })
            setLaboratorios(dataDB)
        }catch (error){
            console.log(error);
            setError(error.message);
        }
    }

    const addData = async (fechaRegistro,nombreLaboratorio,coordinador,telefono,email) =>{
        try{
            const newDoc = {
                Fecha:fechaRegistro,
                NombreLaboratorio:nombreLaboratorio,
                Coordinador:coordinador,
                Telefono:telefono, 
                Email:email,
            }
            const docRef = doc(collection(db, "laboratorios"));
            await setDoc(docRef, newDoc).then(doc => {
                console.log(doc)
                getData()
            })
            }catch(error){
                setError(error.message);
            }
    }

    const deleteData = async (laboratoriosid) =>{
        try{
            setLoading (prev =>({
                ...prev, deleteData:true
            }));
            const docRef = doc(db, "laboratorios", laboratoriosid);
            await deleteDoc (docRef)
            setLaboratorios(laboratorios.filter(item =>  item.id !== laboratoriosid))
            }catch(error){
                setError(error.message);
            }finally{
                setLoading (prev =>({
                    ...prev, deleteData:true
                }));
            } 
    }

    const updateData = async(laboratoriosid, newFechaRegistro,newNombreLaboratorio,newCoordinador,newTelefono,newEmail )=>{
        try{
            const docRef = doc(db, "laboratorios", laboratoriosid);
            await updateDoc (docRef, {
                Fecha:newFechaRegistro,
                NombreLaboratorio:newNombreLaboratorio,
                Coordinador:newCoordinador,
                Telefono:newTelefono, 
                Email: newEmail
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
        laboratorios,
        loading,
        error,
        addData,
        getData,
        deleteData,
        updateData
        }}>
            {children}
        </authcontext.Provider>
    ) 

}