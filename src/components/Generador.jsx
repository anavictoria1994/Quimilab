import * as React from 'react';
import Statements from './Statements/Statements';

export function Generador(){ 
        
    return (
      <Statements/>
    );
}

export default function Dashboard() {
    return <Generador/>;
}