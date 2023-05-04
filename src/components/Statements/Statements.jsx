import React from 'react'
import {Box} from '@mui/material'
import StatementsList from './StatementsList'


export function  Statements(){
  return (
    <Box sx={{py:2}}>
        <StatementsList/>
    </Box>
  )
}

export default function Dashboard() {
  return <Statements/>;
}
