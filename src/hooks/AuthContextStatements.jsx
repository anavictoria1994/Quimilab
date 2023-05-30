import { createContext, useContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  Timestamp
} from "firebase/firestore";
import { app } from "../app/firebase";

export const authcontext = createContext();

export const useAuthStatement = () => {
  const context = useContext(authcontext);
  return context;
}; 

const db = getFirestore(app);

export function AuthProviderDeclaraciones({ children }) {
  const [statements, setStatements] = useState([]);
  const [error, setError] = useState();
  const [waste, setWaste] = useState([]);

  useEffect(() => {
    getStatements();
  }, []);

  const getStatements = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "declaraciones"));
      const dataDB = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(dataDB);
      setStatements(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const addStatements = async (data) => {
    try {
      const newDoc = {
        etapa:0,
        id_generador: data.generador,
        id_lababoratorio: data.laboratorio,
        fecha_creacion: Timestamp.fromDate(new Date(data.fechaCreacion)),
        fecha_revision: null,
        fecha_recepcion: null,
        residuos: data.residuos,
        fecha_verificacion: null,
        fecha_finalizacion: null,
      };
      const docRef = doc(collection(db, "declaraciones"));
      await setDoc(docRef, newDoc).then((doc) => {
        console.log("Hola"+doc.data());
        getStatements();
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const updateStatement = () => {
    try {
      
    } catch (error) {
      
    }
  }

  const deleteStatement = () => {
    try {
      
    } catch (error) {
      
    }
  }

  const getWaste = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "residuos"));
      const dataDB = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(dataDB);
      setWaste(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <authcontext.Provider value={{ statements, addStatements }}>
      {children}
    </authcontext.Provider>
  );
}
