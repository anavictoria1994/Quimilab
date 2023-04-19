import React from "react";
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel,FormControl } from "@mui/material";
import Footer from "./Footer";


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function Registro(){
    
   
    const [email, setEmiel] = React.useState('');

    const [error,setError] = React.useState({
        error: false,
        text:"Ingrese un correo valido",
    });
    
    const validateEmail = (email)=>{
        const regex = /^[A-Z0-9._%+-]+@[correounivalle]+\.[edu]+\.[co]/i;
        return regex.test(email);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(validateEmail(email)){
            setError({
            error: false,
            text:"Ingrese un correo valido",
            });
            console.log("email correcto");
        } else{
            setError({
                error: true,
                text:"Formato de email incorrecto",
            });
                console.log("email incorrecto");
        }
    }

    const [cargo, setCargo] = React.useState('');
    const handleChange = (event) => {
      setCargo(event.target.value);
    };
    const [documento, setDocumento] = React.useState('');
    const handleChangeDocumento = (event) => {
        setDocumento(event.target.value);
    };
  
   
    return (
        <>
            <Box  sx={style}  onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                    Solicitud de Registro
                </Typography>
                <TextField margin="normal" required fullWidth id="Nombre" label="Nombre" name="Nombre"
                     autoFocus />
                <TextField margin="normal" required fullWidth name="Apellidos" label="Apellidos" type="Apellidos"
                    id="Apellidos" />
                <FormControl fullWidth margin="normal">
                <InputLabel id="select-label" >Tipo de Documento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={documento}
                    label="Tipo de Documento"
                    onChange={handleChangeDocumento}
                >
                    <MenuItem value={10}>Cedula de Ciudadania</MenuItem>
                    <MenuItem value={20}>Pasaporte</MenuItem>
                    <MenuItem value={30}>Carnet</MenuItem>
                </Select>
                </FormControl>
                <TextField margin="normal" required fullWidth name="NumDocumen" label="Numero de Documento" type="number"
                    id="NumDocumen" />
                    <TextField margin="normal" required fullWidth name="Telefono" label="Telefono" type="number" 
                    id="Telefono" />
                <TextField margin="normal" required fullWidth name="email" label="Correo Intitucional" type="email"
                    id="email" value={email}  error={error.error} helperText={error.text} 
                    onChange={(e) => setEmiel (e.target.value)} />

                <FormControl fullWidth margin="normal">
                <InputLabel id="select-label" >Cargo</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cargo}
                    label="Cargo"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Laboratorista</MenuItem>
                    <MenuItem value={20}>Estudiante</MenuItem>
                    <MenuItem value={30}>Practicante</MenuItem>
                </Select>
                </FormControl>
                <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >REGISTRARME</Button>
                               
            </Box>
            <Footer/>
        </>
       
    )
}

 