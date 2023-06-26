import { createContext, useContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { app } from "../app/firebase";
import { async } from "@firebase/util";

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
  const batch = writeBatch(db);
  useEffect(() => {
    getStatements();
  }, []);

  const getStatements = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "declaraciones"));
      const dataDB = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(dataDB);
      setStatements(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const addStatements = async (data) => {
    try {
      console.log("ADD STATEMENT:");
      console.log(data.residuos);
      const newDoc = {
        etapa: 0,
        id_generador: data.idGenerador,
        id_laboratorio: data.laboratorio,
        fecha_creacion: Timestamp.fromDate(new Date(data.fechaCreacion)),
        fecha_revision: null,
        fecha_recepcion: null,
        residuos: data.residuos,
        fecha_verificacion: null,
        fecha_finalizacion: null,
      };
      //const docRef = await addDoc(collection(db, "declaraciones"), newDoc)
      const docRef = doc(collection(db, "declaraciones"));
      newDoc.residuos.map((item, index) => {
        const array = [...newDoc.residuos];
        array[index].id_declaracion = docRef.id;
      });
      console.log(newDoc);
      console.log("REFERENCIA: ", docRef.id);
      await setDoc(docRef, newDoc).then((doc) => {
        addWaste(newDoc.residuos);
        console.log("EXITOSOO");
      });
      //await addWaste(newDoc.residuos, docRef);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateStatement = () => {
    try {
    } catch (error) {}
  };

  const deleteStatement = () => {
    try {
    } catch (error) {}
  };

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

  const addWaste = async (r) => {
    try {
      const collectionRef = collection(db, "residuos");

      r.forEach((documento, index) => {
        const docRef = doc(collectionRef, documento.id_declaracion + index);
        batch.set(docRef, { documento });
      });

      batch.commit().then(() => {
          alert("EXITOSO");
          getStatements();
        })
        .catch((error) => {
          console.error("Error al guardar en la base de datos:", error);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <authcontext.Provider value={{ statements, addStatements, addWaste }}>
      {children}
    </authcontext.Provider>
  );
}
