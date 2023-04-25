import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';


export const mainListItems = (
    
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Mi Perfil" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DeleteSweepIcon />
      </ListItemIcon>
      <ListItemText primary="Declaración" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ChecklistRtlIcon />
      </ListItemIcon>
      <ListItemText primary="Seguimiento" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reportes" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Cerrar sesion
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Salir" />
    </ListItemButton>
  </React.Fragment>
);