import React from 'react'
import {Box} from '@mui/material'
import ReactivosList from './ReactivosList'


export function  Reactivos(){
  return (
    <Box sx={{py:2}}>
        <ReactivosList/>
    </Box>
  )
}

export default function Dashboard() {
  return <Reactivos/>;
}
