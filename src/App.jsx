import React from "react";
import { Routes, Route} from 'react-router-dom';
import {Home} from "./components/Home";
import {Generador} from "./components/Generador";
import {ContenedorPrincipal} from "./components/ContenedorPrincipal";
import {Administrador} from "./components/Administrador";
import {Operador} from "./components/Operador";
import {Registro} from "./components/Registro";
import {AuthProvider} from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProtectedRouteHome } from "./components/ProtectedRouteHome";
import { Seguimiento } from "./components/Seguimiento";
import { RecuperarCon } from "./components/RecuperarCon";

function App() {

  return (
    <AuthProvider>
      <ContenedorPrincipal>
      <Routes>
        <Route path="/Registro" element ={<Registro/>} />
        <Route path="/RecuperarCon" element ={<RecuperarCon/>} />
        {/* <Route path="/PaginaPrincipal" element ={<PaginaPrincipal/>} /> */}
        <Route path="/Seguimiento" element ={<Seguimiento/>} />
        <Route path="/Generador" element ={
        <ProtectedRoute>
        <Generador/>
        </ProtectedRoute>
        
        } />
        <Route path="/Operador" element ={
          <ProtectedRoute>
          <Operador/>
        </ProtectedRoute>
        } />
        <Route path="/Administrador" element ={
        <ProtectedRoute>
          <Administrador/>
        </ProtectedRoute>
        } />
        <Route path="/" element ={
          <ProtectedRouteHome>
          <Home/>
        </ProtectedRouteHome>} />
      </Routes>
      </ContenedorPrincipal>
    </AuthProvider>
  );
}

export default App;
