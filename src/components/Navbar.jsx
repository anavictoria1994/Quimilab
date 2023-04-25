import {useState} from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import { useAuth } from "../context/AuthContext";
import imgQuimilab from "../assets/img/quimilabimg.png"
import {Link, Grid, TextField, Modal, Button, Typography, Toolbar, Box, } from "@mui/material"




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

  
const Navbar = () =>{

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 
    
    const [user, setUser] = useState({
        email:"",
        password:"",
    });

    const {login, loginWithGoogle} = useAuth();
    const navigate = useNavigate()

    const [error,setError] = useState({
        error: false,
        text:"",
        
    });

    
    const handleChange = ({target: {name, value}}) =>{ 
        setUser({...user,[name]:value})
    };

    const validateEmail = (email)=> {
        const regex = /^[A-Z0-9._%+-]+@[correounivalle]+\.[edu]+\.[co]/i;
        return regex.test(email);
    };

    const handleSubmitGoogle =  async(event) =>{
        try{
            await loginWithGoogle()
            navigate("/Administrador")
        }catch(error){
            setError({
                error: true,
                text:"Email o Contraseña incorrecto",
            });
            
        }
       
    }

    const handleSubmit =  async(event) =>{
        event.preventDefault();
        
        if(validateEmail(user.email)){
            setError({
            error: false,
            text:"",

            });
            try{
                await login (user.email, user.password)
                navigate("/Administrador")
            }catch(error){
                setError({
                    error: true,
                    text:"Email o Contraseña incorrecto",
                });
                
            }
        } else{
            setError({
                error: true,
                text:"Email o Contraseña incorrecto",
            });
        } 
             
    }

    return(
        
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{bgcolor: "#FF0000"}}>
                <Toolbar>
                    <img src = {imgQuimilab} alt="Imagen nv" class="img"/>   
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        QuimiLab
                    </Typography>
                    <Button color="inherit" onClick={handleOpen}>Iniciar Sesion</Button>
                    <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                                Iniciar Sesion
                            </Typography>
                            
                            <TextField margin="normal" required fullWidth name="email" label="Correo Intitucional" type="email"
                            id="email"  error={error.error} helperText={error.text}  onChange={handleChange} 
                             />

                            <TextField margin="normal" required fullWidth id="password" label="contraseña" name="password"
                                autoComplete="password" type="password" autoFocus   error={error.error} helperText={error.text} onChange={handleChange} />

                            <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Ingresar</Button>
                            <Button onClick={handleSubmitGoogle} id = "googlelogin" type="button" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Ingresar con Google</Button>
                                <Grid container>
                                    <Grid item xs>
                                    <Link href="/Usuario" variant="body2" color="#FF0000">
                                        Olvidó Contraseña?
                                    </Link>
                                    </Grid>
                                    <Grid item>
                                    <Link href="/Registro" variant="body2" color="#FF0000">
                                        No tiene cuenta? Registrarse
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
        
    )
   
}

export default Navbar;
