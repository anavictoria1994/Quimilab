import { Box, Grid } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Perfil from "../assets/img/miperfil.png";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export function PerfilUsuario(){


    return (
        <Container maxWidth="sm">
            <Box sx={{ flexGrow: 1 }}>

                <Grid container direction="column" alignItems="center" justify ="center" p={2}>
                    <Typography  variant="h4" >
                            MI PERFIL
                    </Typography>
                </Grid>
                <Grid container direction="column" alignItems="center" justify ="center" p={2}>
                    <img src = {Perfil} alt="Imagen UV" class="img"/>
                </Grid>
                       
                <Grid container spacing={1} direction="column" justify ="center" p={2}>
                    <Grid item md={1} >
                        <Typography  variant="h5" >
                            Nombre: Ana
                        </Typography>
                    </Grid>
                    <Grid item md={1} >
                        <Typography variant="h5"   >
                        Apellido: Acuna
                        </Typography>
                    </Grid>
                    <Grid item md={1} >
                        <Typography variant="h5"   >
                        Telefono: 318 56
                        </Typography>
                    </Grid>
                    <Grid item md={1} >
                        <Typography variant="h5"  >
                        Cargo: Laboratorista
                        </Typography>
                    </Grid>
                    <Grid item md={1} >
                        <Typography variant="h5"  >
                        Correo: ana.acunam@correounivalle.edu.co
                        </Typography>
                    </Grid>
                    <Grid item xs={1} >
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}}textAlign='center' >
                            Editar
                        </Button>
                        </Grid>
                    <Grid item xs={1} >
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}}textAlign='center' >
                            Cambiar contraseña
                        </Button>
                    </Grid>
                    
                </Grid> 
            </Box>
        </Container>
   
    );
}


export default function Dashboard() {
    return <PerfilUsuario/>;
}
