
import {useState} from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
};

export function RecuperarCon(){

        
    const handleSubmit = async event =>{
        event.preventDefault(); 
    }
  
    return (
        <>
            <Box  sx={style}  onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                    Recuperar contraseña
                </Typography>
                <TextField margin="normal" required fullWidth id="email" label="email" name="email"  
                     autoFocus onChange={handleSubmit}/>
                <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Cambiar contraseña</Button>
                <Link href="/" variant="body2"  color="#FF0000">
                    Salir
                </Link>        
            </Box>
        </>
    )
}