import * as React from 'react';
import {  Grid } from '@mui/material';
import imgQuimilab from "../assets/img/quimilabimg.png"

export function Administrador(){
       
    return (
        <Grid container direction="column" alignItems="center" justify ="center" p={2}>
                  <img src = {imgQuimilab} alt="Imagen nv" class="img"/>   
            </Grid>
        
    );
}

export default function Dashboard() {
    return <Administrador/>;
  }