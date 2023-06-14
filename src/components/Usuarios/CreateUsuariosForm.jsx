import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Container,
  
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateUsuariosForm = ({onAdd}) => {
  const [openAler, setOpenAlert] = useState(false);
  const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
  };  
  
  const [ingresaUsuario, setUsuario] = useState({
    nombreUsu: "",
    apellidosUsu: "",
    docuentoUsu: "",
    tipodocumentoUsu: "",
    telefonoUsu: "",
    emailUsu: "",
    cargoUsu: "",
    rolUsu: "",
    password:"",
    password2:"",
    
  });
  
  const [error,setError] = useState({
    error: false,
    text:"",
    
  });

  const handleChange = ({target: {name, value}}) =>{ 
    setUsuario({...ingresaUsuario,[name]:value})
  };
  const [errorContra,setErrorContra] = useState({
    error: false,
    text:"",  
  });

  const validateEmail = (email)=> {
    const regex = /^[A-Z0-9._%+-]+@[correounivalle]+\.[edu]+\.[co]/i;
    return regex.test(email);
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!ingresaUsuario.nombreUsu.trim || !ingresaUsuario.apellidosUsu.trim || !ingresaUsuario.docuentoUsu.trim){
      setError({
        error: true,
        text: "Debe llenar todos los campos",
      });
      return;  
    }
    if(validateEmail(ingresaUsuario.emailUsu)){
      setError({
      error: false,
      text:"El correo debe ser institucional",
      });
    } 
    if (ingresaUsuario.password !== ingresaUsuario.password2) {
      setErrorContra({
          error: true,
          text: "Las contraseñas no son iguales",
      });
      return;
    }
    try{
      await onAdd(ingresaUsuario.emailUsu,ingresaUsuario.password,ingresaUsuario.nombreUsu, ingresaUsuario.apellidosUsu,  ingresaUsuario.tipodocumentoUsu, ingresaUsuario.docuentoUsu, ingresaUsuario.telefonoUsu, ingresaUsuario.cargoUsu, ingresaUsuario.rolUsu)
      setOpenAlert(true);
      setUsuario({
        nombreUsu: "",
        apellidosUsu: "",
        docuentoUsu: "",
        tipodocumentoUsu: "",
        telefonoUsu: "",
        emailUsu: "",
        cargoUsu: "",
        rolUsu: "",
        password:"",
        password2:"",
      });
    }catch(error){
      console.log(error.Code);
      setError({
        error: true,
        text:"Problemas con el registro",
      });                
    }
    
  }
  return (
    <Container>
      <Grid container sx={{ p: 10 }} spacing={6}>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField  required value={ingresaUsuario.nombreUsu} fullWidth label="Nombre" name="nombreUsu" error={error.error} helperText={error.text} onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={ingresaUsuario.apellidosUsu} error={error.error} helperText={error.text} fullWidth label="Apellidos" name="apellidosUsu" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
        <FormControl fullWidth margin="normal">
                <InputLabel id="select-label" >Tipo de Documento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="tipodocumentoUsu"
                    label="Tipo de Documento"
                    name="tipodocumentoUsu"
                    onChange={handleChange}
                >
                    <MenuItem value={"Cedula"}>Cedula de Ciudadania</MenuItem>
                    <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
                    <MenuItem value={"Carnet"}>Carnet</MenuItem>
                </Select>
                </FormControl>
          </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={ingresaUsuario.docuentoUsu} error={error.error} helperText={error.text} fullWidth label="Documento" name="docuentoUsu" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={ingresaUsuario.telefonoUsu} error={error.error} helperText={error.text} fullWidth label="Telefono" name="telefonoUsu" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={ingresaUsuario.emailUsu} error={error.error} helperText={error.text} fullWidth label="Correo" name="emailUsu" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <FormControl fullWidth required>
            <InputLabel error={error.error} helperText={error.text} id="select-label" >Rol</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="rolUsu"
              label="Rol"
              name="rolUsu"
              onChange={handleChange}>
                    <MenuItem value={"Administrador"}>Administrador</MenuItem>
                    <MenuItem value={"Operador"}>Operador</MenuItem>
                    <MenuItem value={"Invitado"}>Invitado</MenuItem>
                    <MenuItem value={"Generador"}>Generador</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-label">Cargo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="cargoUsu"
                label="Cargo"
                name="cargoUsu"
                onChange={handleChange}
                >
                    <MenuItem value={"Laboratorista"}>Laboratorista</MenuItem>
                    <MenuItem value={"Profesor"}>Profesor</MenuItem>
                    <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
                    <MenuItem value={"Practicante"}>Practicante</MenuItem>
                    <MenuItem value={"Servicios"}>Servicios Varios</MenuItem>
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
        <TextField margin="normal" value={ingresaUsuario.password} required fullWidth id="password" label="contraseña" name="password" 
             autoComplete="password" type="password" autoFocus  error={errorContra.error} helperText={errorContra.text}  onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
        <TextField margin="normal" value={ingresaUsuario.password2} required fullWidth id="password2" label="Confirme la contraseña" name="password2" 
              autoComplete="password" type="password" autoFocus error={errorContra.error} helperText={errorContra.text} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 3, textAlign:"center" }}>
          <Button onClick={handleSubmit} variant="contained"  sx={{width:"30%", bgcolor: "#FF0000"}}>Registrar</Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 3, textAlign:"center" }}>
          <Button variant="contained"  sx={{width:"30%", bgcolor: "#FF0000"}}>Cerrar</Button>
        </Grid>
      </Grid>
      <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Usuario Registrado Correctamente!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateUsuariosForm;
