import * as React from 'react';
import {  Box, Grid } from '@mui/material';
import imgQuimilab from "../assets/img/imagenquimilab.png"

const style = {
  position: 'absolute',
  top: '50%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid error.main',
  borderRadius: '2%',
  boxShadow: 24,
  p: 4,
};

export function Operador(){ 
        
    return (
      <Box sx={style}>
        <Grid container direction="column" alignItems="center" justify ="center" p={2}>
                  <img src = {imgQuimilab} alt="Imagen nv" class="img"/>   
        </Grid>
      </Box>
      
    );
}

export default function Dashboard() {
    return <Operador/>;
}