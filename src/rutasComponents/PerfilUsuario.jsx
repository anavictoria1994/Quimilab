import * as React from 'react';
import {forwardRef, useState} from "react";
import Container from '@mui/material/Container';
import Perfil from "../assets/img/miperfil.png";
import { useAuth } from "../context/AuthContext";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton,Grid, TextField, Modal, Button, Typography, Box, } from "@mui/material"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})
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
    const {usere, updatePasswordc, reauthenticateWithCredentiaL} = useAuth();
    const [openAler, setOpenAlert] = useState(false);

    const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };

    const [error,setError] = useState({
        error: false,
        text:"",
        
    });

    const [user, setUser] = useState({
        contrasena:"",
        contrasena1:"",
        contrasenaOld:"",
    });

    const handleChange = ({target: {name, value}}) =>{ 
        setUser({...user,[name]:value})
    };

    const handleSubmit=  async(event) =>{
        event.preventDefault();
        if (user.contrasena !== user.contrasena1) {
            setError({
                error: true,
                text: "Las contraseñas no son iguales",
            });
            return;
        }
        const reauthenticateWith = await reauthenticateWithCredentiaL(user.contrasena);
        if(!reauthenticateWith.statusResponse){
            setError({
                error: true,
                text: "Contrasena incorrecta",
            });
        }

        try{  
            await updatePasswordc (user.contrasena)
            console.log('se cambio la contrasena')
            setOpenAlert(true);
        }catch(error){
            console.log(usere)
            console.log({error}) 
            if (error.code === "auth/weak-password"){
                setError({
                    error: true,
                    text:"La contraseña debe tener mas de 6 caracteres",
                });
            } 
        }
    }

    return (
        <>
        
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
                    <Grid item md={1} xs={12} sm={6}>
                        <Typography variant="h5"  >
                        Correo: {usere.email}
                        </Typography>
                    </Grid>
                
                    
                </Grid> 
                    <Box mx={4} mr={14} ml={14} sx={{ justifyContent: 'center'}}>
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
                                    <TextField margin="normal" required fullWidth id="contrasenaOld" label="Contraseña actual" name="contrasenaOld" type="password" 
                                    autoFocus onChange={handleChange} error={error.error} helperText={error.text}/>
                                    <TextField margin="normal" required fullWidth id="contrasena" label="Nueva contraseña" name="contrasena1" type="password" 
                                    autoFocus onChange={handleChange} error={error.error} helperText={error.text}/>
                                    <TextField margin="normal" required fullWidth id="contrasena2" label="Confirme la contraseña" name="contrasena" type="password" 
                                    autoFocus onChange={handleChange} error={error.error} helperText={error.text}/>
                                    <Button onClick={handleSubmit} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Guardar</Button>
                                </Box>
                            </Modal>
                        </div>
                
            </Box>
            
        </Container>
        <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
            <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                        Cambio de contraseña exitoso!
            </Alert>
        </Snackbar>
        </>
    );
}


export default function Dashboard() {
    return <PerfilUsuario/>;
}
