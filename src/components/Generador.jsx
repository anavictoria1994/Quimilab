import * as React from 'react';
import {  Grid } from '@mui/material';
import imgQuimilab from "../assets/img/imagenquimilab.png"

export function Generador(){ 
        
    return (
      <Grid container direction="column" alignItems="center" justify ="center" p={2}>
                  <img src = {imgQuimilab} alt="Imagen nv" class="img"/>   
      </Grid>
    );
}

export default function Dashboard() {
    return <Generador/>;
}