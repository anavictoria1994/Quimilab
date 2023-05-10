
import { forwardRef,useState} from "react";
import { useAuth } from "../context/AuthContext";
import Container from '@mui/material/Container';
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Link } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

export function Registro(){
    const [openAler, setOpenAlert] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };

    const [user, setUser] = useState({
        Nombre: "",
        Apellidos:"",
        tipoDocumento:"",
        NumDocumento:"",
        Telefono:"",
        email:"",
        cargo:"",
        password:"",
        password2:"",
        Rol:"Invitado",
    });

    const {signup} = useAuth()

    const handleChange = ({target: {name, value}}) =>{ 
        setUser({...user,[name]:value})
        
    };

    const [error,setError] = useState({
        error: false,
        text:"",
        
    });
    const [errorContra,setErrorContra] = useState({
        error: false,
        text:"",  
    });
    
    const validateEmail = (email)=> {
        const regex = /^[A-Z0-9._%+-]+@[correounivalle]+\.[edu]+\.[co]/i;
        return regex.test(email);
    };
        
    const handleSubmit = async event =>{
        event.preventDefault();

        if (user.password !== user.password2) {
            setErrorContra({
                error: true,
                text: "Las contraseñas no son iguales",
            });
            return;
        }
        if(validateEmail(user.email)){
            setError({
            error: false,
            text:"",
            });
            console.log(user.Nombre)
            try{
                await signup(user.email, user.password, user.Nombre, user.Apellidos, user.tipoDocumento,user.NumDocumento, user.Telefono, user.cargo, user.Rol)
                setOpenAlert(true);
            }catch(error){
                console.log(error.Code);
               
                if (error.code === "auth/weak-password"){
                    setErrorContra({
                        error: true,
                        text:"La contraseña debe tener mas de 6 caracteres",
                    });
                }
            }
        } else {
            setError({
                error: true,
                text:"Formato de email incorrecto",
            });
        }
        
    }

  
    return (
        <>
        <Container maxWidth="md">
            <Box  sx={style}  onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                    Solicitud de Registro
                </Typography>
                <TextField margin="normal" required fullWidth id="Nombre" label="Nombre" name="Nombre"  
                     autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth name="Apellidos" label="Apellidos" type="Apellidos"
                    id="Apellidos" onChange={handleChange} error={error.error} helperText={error.text}/>
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
                    id="NumDocumento" error={error.error} helperText={error.text} onChange={handleChange}/>
                <TextField margin="normal" required fullWidth name="Telefono" label="Telefono" type="number" 
                    id="Telefono" error={error.error} helperText={error.text} onChange={handleChange}/>
                <TextField margin="normal" required fullWidth name="email" label="Correo Intitucional" type="email"
                    id="email"   error={error.error} helperText={error.text} 
                    onChange={handleChange} 
                />
                
                <FormControl fullWidth margin="normal">
                <InputLabel id="select-label">Cargo</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="cargo"
                    label="Cargo"
                    name="cargo"
                    onChange={handleChange}
                >
                    <MenuItem value={"Laboratorista"}>Laboratorista</MenuItem>
                    <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
                    <MenuItem value={"Practicante"}>Practicante</MenuItem>
                    <MenuItem value={"Servicios"}>Servicios Varios</MenuItem>
                </Select>
                </FormControl>

                <TextField margin="normal" required fullWidth id="password" label="contraseña" name="password" 
                                autoComplete="password" type="password" autoFocus   error={errorContra.error} helperText={errorContra.text} onChange={handleChange} />
                <TextField margin="normal" required fullWidth id="password2" label="Confirme la contraseña" name="password2" 
                                autoComplete="password" type="password" autoFocus   error={errorContra.error} helperText={errorContra.text} onChange={handleChange} />
                
                <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Enviar Registro</Button>
                
                <Link href="/" variant="body2"  color="#FF0000">
                    Salir
                </Link>        
            </Box>
            
        </Container>
        <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            Ingreso exitoso!
        </Alert>
    </Snackbar>
    </>
    )
}

 