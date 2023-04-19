import React from "react";
import { Routes, Route} from 'react-router-dom';
import {Home} from "./components/Home";
import {Generador} from "./components/Generador";
import {Registro} from "./components/Registro";



function App() {
  return (
    <Routes>
        <Route path="/" element ={<Home/>} />
        <Route path="/Usuario" element ={<Generador/>} />
        <Route path="/Registro" element ={<Registro/>} />
  
    </Routes>
        
  );
}

export default App;
