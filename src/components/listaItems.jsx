import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
//import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DashboardIcon from '@mui/icons-material/Dashboard';
//import PeopleIcon from '@mui/icons-material/People';
import BiotechIcon from '@mui/icons-material/Biotech';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const generador = {
  "Mi Perfil": {
    link: "/PerfilUsuario",
    icono: <DashboardIcon />
   },
   "Declaraciones": {
    link: "/Statements",
    icono: <BarChartIcon />,
   },
  // "Seguimiento": <ChecklistRtlIcon />,
  // "Reportes": <BarChartIcon />,
}
const administrador = {
  "Mi Perfil": {
    link: "/PerfilUsuario",
    icono: <DashboardIcon />
   },

   "Reactivos": {
    link: "/Reactivos",
    icono: <ScienceOutlinedIcon/>
   },

   "Laboratorios": {
    link: "/Laboratorios",
    icono: <BiotechIcon/>
   },

   "Usuarios": {
    //link: "/Laboratorios",
    icono: <GroupIcon/>
   },

   "Reportes": {
    //link: "/Laboratorios",
    icono: <BarChartIcon/>
   },

}
const operador = {
  "Seguimiento": {
    link: "/Seguimiento",
    icono: <ChecklistRtlIcon />},
  "Mi Perfil": {
    link: "/PerfilUsuario",
    icono: <DashboardIcon />
  },
  // "Reportes": <BarChartIcon />,
}
const invitado = {
  "Mi Perfil": {
    link: "/PerfilUsuario",
    icono: <DashboardIcon />
   },
}

export const MainListItems = () => {
  const navigate = useNavigate();
  const {usere} = useAuth();
  let items = []
  switch (usere.rol){
    case "Administrador":
      items = Object.entries(administrador)
      break
    case "Generador":
      items = Object.entries(generador)
      break
    case "Operador":
      items = Object.entries(operador)
      break
    
    case "Invitado":
      items = Object.entries(invitado)
      break
    default:
      break
  }
  return <>
  {items.map(([key, val]) => (

    <ListItemButton key={key} onClick={() => navigate(val.link)}>
    <ListItemIcon>
      {val.icono}
    </ListItemIcon>
    <ListItemText primary={key} />
    </ListItemButton>
  ))}
  </>
}

export const SecondaryListItems = ()=>{
  const {logout} = useAuth();

  const handleLogout = async() =>{
    await logout()
  };
  
  return <>
    <ListSubheader component="div" inset>
      Cerrar sesion
    </ListSubheader>
    <ListItemButton id="salir" onClick={handleLogout}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Salir" />
    </ListItemButton>
  </>
};