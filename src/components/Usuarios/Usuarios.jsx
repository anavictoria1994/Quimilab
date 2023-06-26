import React from 'react'
import {Box} from '@mui/material'
import UsuariosList from './UsuariosList'


export function  Usuarios(){
  return (
    <Box sx={{py:2}}>
        <UsuariosList/>
    </Box>
  )
}

export default function Dashboard() {
  return <Usuarios/>;
}
