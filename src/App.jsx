import React from "react";
import { Routes, Route} from 'react-router-dom';
import {Home} from "./components/Home";
import {Generador} from "./components/Generador";
import {Administrador} from "./components/Administrador";
import {Registro} from "./components/Registro";
import {AuthProvider} from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";


function App() {

  return (
    <AuthProvider>

      <Routes>
        <Route path="/" element ={<Home/>} />
        <Route path="/Registro" element ={<Registro/>} />
        <Route path="/Generador" element ={
          
            <Generador/>
          
            } />
        <Route path="/Administrador" element ={
          <ProtectedRoute>
          <Administrador/>
        </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
    
        
  );
}

export default App;
