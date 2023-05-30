import React from "react";
import { Routes, Route} from 'react-router-dom';
import {Home} from "./components/Home";
import {Generador} from "./components/Generador";
import {ContenedorPrincipal} from "./components/ContenedorPrincipal";
import {Administrador} from "./components/Administrador";
import {Invitado} from "./components/Invitado";
import {Operador} from "./components/Operador";
import {Registro} from "./components/Registro";
import {AuthProvider} from "./context/AuthContext";
import {AuthProviderReactivos} from "./hooks/AuthContextReactivos";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProtectedRouteHome } from "./components/ProtectedRouteHome";
import { Seguimiento } from "./rutasComponents/Seguimiento";
import { PerfilUsuario } from "./rutasComponents/PerfilUsuario";
import { RecuperarCon } from "./rutasComponents/RecuperarCon";
import {Statements} from './components/Statements/Statements';
import {Reactivos} from './components/Reactivos/Reactivos';
import { AuthProviderDeclaraciones } from "./hooks/AuthContextStatements";


function App() {

  return (
    <AuthProvider>
      <AuthProviderReactivos>
      <AuthProviderDeclaraciones>
      <ContenedorPrincipal>
      <Routes>
        <Route path="/Registro" element ={<Registro/>} />
        <Route path="/RecuperarCon" element ={<RecuperarCon/>} />
        <Route path="/Seguimiento" element ={
          <ProtectedRoute>
            <Seguimiento/>
          </ProtectedRoute>
        } />
          
        <Route path="/Statements" element ={
          <ProtectedRoute>
            <Statements/>
          </ProtectedRoute>
        } />

        <Route path="/Reactivos" element ={
          <ProtectedRoute>
            <Reactivos/>
          </ProtectedRoute>
        } />

        <Route path="/PerfilUsuario" element ={
          <ProtectedRoute>
            <PerfilUsuario/>
          </ProtectedRoute>
        } />
        
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

        <Route path="/Invitado" element ={
          <ProtectedRoute>
            <Invitado/>
          </ProtectedRoute>
        } />
        <Route path="/" element ={
          <ProtectedRouteHome>
          <Home/>
        </ProtectedRouteHome>} />
      </Routes>
      </ContenedorPrincipal>
      </AuthProviderDeclaraciones>
      </AuthProviderReactivos>
    </AuthProvider>
  );
}

export default App;
