import * as React from 'react';
import {useState} from "react";
import Container from '@mui/material/Container';
import Perfil from "../assets/img/miperfil.png";
import { useAuth } from "../context/AuthContext";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton,Grid, TextField, Modal, Button, Typography, Box, } from "@mui/material"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid error.main',
    borderRadius: '2%',
    boxShadow: 24,
    p: 4,
};
export function PerfilUsuario(){

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {usere, updatePasswordc} = useAuth();

    const [user, setUser] = useState({
        contrasena:"",
    });
    const handleChange = ({target: {name, value}}) =>{ 
        setUser({...user,[name]:value})
    };

    const handleSubmit=  async(event) =>{
        event.preventDefault();
        try{  
            await updatePasswordc (user.contrasena)
            console.log('se cambio la contrasena')
        }catch(error){
            console.log(usere)
            console.log({error})  
        }
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ flexGrow: 1} }>
                <Grid container direction="column" alignItems="center" justify ="center" p={2} >
                    <Typography  variant="h4" >
                            MI PERFIL
                    </Typography>
                </Grid>
                <Grid container direction="column" alignItems="center" justify ="center" p={2} >
                    <img src = {Perfil} alt="Imagen UV" class="img"/>
                </Grid>
                       
                <Grid container spacing={1}  direction="column" justify ="center" p={2} xs={12} sm={6}>
                    <Grid item md={1} xs={12} sm={6}>
                        <Typography  variant="h5" >
                            Nombre: {usere.nombre}
                        </Typography>
                    </Grid>
                    <Grid item md={1} xs={12} sm={6}>
                        <Typography variant="h5" >
                        Apellidos: {usere.apellidos}
                        </Typography>
                    </Grid>
                    <Grid item md={1} xs={12} sm={6}>
                        <Typography variant="h5">
                        Telefono: {usere.telefono}
                        </Typography>
                    </Grid>
                    <Grid item md={1} xs={12} sm={6}>
                        <Typography variant="h5"  >
                        Cargo: {usere.cargo}
                        </Typography>
                    </Grid>
                    <Grid item md={1} >
                        <Typography variant="h5"  >
                        Correo: {usere.email}
                        </Typography>
                    </Grid>
                
                    
                </Grid> 
                    <Box mx={4} mr={14} ml={14}sx={{ justifyContent: 'center'}}>
                        <Button color="inherit" onClick={handleOpen} type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >
                            Cambiar contraseña
                        </Button>
                    </Box>
                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                                <Box sx={style}>
                                    <IconButton   onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center" xs={12} sm={6}>
                                        Cambiar Contraseña
                                    </Typography>
                                    <TextField margin="normal" required fullWidth id="contrasena" label="Contraseña Nueva" name="contrasena" type="password" 
                                    autoFocus onChange={handleChange}/>
                                    <Button onClick={handleSubmit} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Guardar</Button>
                                </Box>
                            </Modal>
                        </div>
                
            </Box>
        </Container>
   
    );
}


export default function Dashboard() {
    return <PerfilUsuario/>;
}
