import React from 'react'
import {Box} from '@mui/material'
import LaboratoriosList from './LaboratoriosList'


export function Laboratorios(){
  return (
    <Box sx={{py:2}}>
        <LaboratoriosList/>
    </Box>
  )
}

export default function Dashboard() {
  return <Laboratorios/>;
}
