import * as React from 'react';
import {forwardRef, useState} from "react";
import {  useAuth } from "../context/AuthContext";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
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

export function RecuperarCon(){
    const { resetPassword} = useAuth();
    const [user, setUser] = useState({
        email:"",
    });
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

    const handleChange = ({target: {name, value}}) =>{ 
        setUser({...user,[name]:value})
    };   
    const handleSubmit = async event =>{
        event.preventDefault();
        if(!user.email) return console.log('no existe el email') 
        try{  
            await resetPassword (user.email)
            setOpenAlert(true);
            
        }catch(error){ 
            console.log({error})
            if(error.code === "auth/user-not-found"){
                setError({
                    error: true,
                    text:"Correo no Registrado",
                });
            }  
        }
    }
  
    return (
        <>
            <Box  sx={style}  onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                    Recuperar contraseña
                </Typography>
                <TextField margin="normal" required fullWidth id="email" label="email" name="email"  
                     autoFocus onChange={handleChange} error={error.error} helperText={error.text}/>
                <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Restablecer Contraseña</Button>
                <Link href="/" variant="body2"  color="#FF0000">
                    Salir
                </Link>        
            </Box>
            <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
            <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                        Se envio un link a su email!
            </Alert>
            </Snackbar>
        </>
    )
}