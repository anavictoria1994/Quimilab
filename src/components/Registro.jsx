
import {useState} from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Link } from "@mui/material";



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

export function Registro(){

    const [user, setUser] = useState({
        Nombre: "",
        Apellidos:"",
        tipoDocumento:"",
        NumDocumento:"",
        Telefono:"",
        email:"",
        Cargo:"",
        Contrasena:"",
        laboratorio:"",
        Rol:"",
    });

    const {signup} = useAuth()
    const navigate = useNavigate()

    const handleChange = ({target: {name, value}}) =>{ 
        setUser({...user,[name]:value})
    };

    const [error,setError] = useState({
        error: false,
        text:"",
        
    });
    
    const validateEmail = (email)=> {
        const regex = /^[A-Z0-9._%+-]+@[correounivalle]+\.[edu]+\.[co]/i;
        return regex.test(email);
    };
        
    const handleSubmit = async event =>{
        event.preventDefault();
        if(validateEmail(user.email)){
            setError({
            error: false,
            text:"",
            });
            try{
                await signup(user.email, user.Contrasena, user.Nombre, user.Apellidos, user.tipoDocumento, user.NumDocumento, user.Telefono, user.Cargo)
                navigate("/")
            }catch(error){
                console.log(error);
            }
        } else{
            setError({
                error: true,
                text:"Formato de email incorrecto",
            });
        } 
    }

  
    return (
        <>
            <Box  sx={style}  onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                    Solicitud de Registro
                </Typography>
                <TextField margin="normal" required fullWidth id="Nombre" label="Nombre" name="Nombre"  
                     autoFocus onChange={handleChange}/>
                <TextField margin="normal" required fullWidth name="Apellidos" label="Apellidos" type="Apellidos"
                    id="Apellidos" onChange={handleChange}/>
                <FormControl fullWidth margin="normal">
                <InputLabel id="select-label" >Tipo de Documento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="tipoDocumento"
                    
                    label="Tipo de Documento"
                    name="tipoDocumento"
                    onChange={handleChange}
                >
                    <MenuItem value={"Cedula"}>Cedula de Ciudadania</MenuItem>
                    <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
                    <MenuItem value={"Carnet"}>Carnet</MenuItem>
                </Select>
                </FormControl>
                <TextField margin="normal" required fullWidth name="NumDocumento" label="Numero de Documento" type="number"
                    id="NumDocumento" onChange={handleChange}/>
                <TextField margin="normal" required fullWidth name="Telefono" label="Telefono" type="number" 
                    id="Telefono" onChange={handleChange}/>
                <TextField margin="normal" required fullWidth name="email" label="Correo Intitucional" type="email"
                    id="email"   error={error.error} helperText={error.text} 
                    onChange={handleChange}  />

                <FormControl fullWidth margin="normal">
                <InputLabel id="select-label" >Cargo</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="Cargo"
                    label="Cargo"
                    name="Cargo"
                    onChange={handleChange}
                >
                    <MenuItem value={"Laboratorista"}>Laboratorista</MenuItem>
                    <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
                    <MenuItem value={"Practicante"}>Practicante</MenuItem>
                </Select>
                </FormControl>
                <TextField margin="normal" required fullWidth name="Contrasena" label="Contrasena" type="password"
                    id="Contrasena"  onChange={handleChange}  />
                <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Enviar Registro</Button>
                <Link href="/" variant="body2"  color="#FF0000">
                    Salir
                </Link>        
            </Box>
        </>
    )
}

 