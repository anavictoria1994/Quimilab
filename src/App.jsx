import React from "react";
import { Routes, Route} from 'react-router-dom';
import {Home} from "./components/Home";
import {Generador} from "./components/Generador";
import {Administrador} from "./components/Administrador";
import {Registro} from "./components/Registro";
import {AuthProvider} from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element ={<Home/>} />
        <Route path="/Usuario" element ={<Generador/>} />
        <Route path="/Registro" element ={<Registro/>} />
        <Route path="/Administrador" element ={<Administrador/>} />
       
      </Routes>
    </AuthProvider>
    
        
  );
}

export default App;
