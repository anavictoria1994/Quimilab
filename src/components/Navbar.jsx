import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import imgQuimilab from '../assets/img/quimilabimg.png';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';



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
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{bgcolor: "#FF0000"}}>
                <Toolbar>
                    <img src = {imgQuimilab} alt="Imagen nv" class="img"/>   
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        QuimiLab
                    </Typography>
                    <Button color="inherit" onClick={handleOpen}>Login</Button>
                    <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                                Login
                            </Typography>
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                                autoComplete="email" autoFocus />
                            <TextField margin="normal" required fullWidth name="password" label="Password" type="password"
                            id="password" autoComplete="current-password"/>
                            <Button onClick={handleOpen} type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Entrar</Button>
                                <Grid container>
                                    <Grid item xs>
                                    <Link href="/Usuario" variant="body2">
                                        Olvidó Contraseña?
                                    </Link>
                                    </Grid>
                                    <Grid item>
                                    <Link href="/Registro" variant="body2">
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
