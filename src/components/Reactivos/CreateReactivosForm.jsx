import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Container,
  Typography
  
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from "../../hooks/AuthContextReactivos";


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateReactivosForm = ({onAdd}) => {
  const {uploadFile} = useAuth();
  const [openAler, setOpenAlert] = useState(false);
  const [file, setFile] = useState({
    filename:"",
    filee:"",
  });
  

  const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
  };  
  
  const [ingresarectivos, setReactivos] = useState({
    Nombre: "",
    Sinonimos: "",
    NombreIn: "",
    Cas: "",
    EstadoFi: "",
    HojaSe: "",
    Cantidad:"",
  });
  
  const [error,setError] = useState({
    error: false,
    text:"",
    
  });

  const handleChange = ({target: {name, value}}) =>{ 
    setReactivos({...ingresarectivos,[name]:value})
  };
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!ingresarectivos.Nombre.trim() || !ingresarectivos.Sinonimos.trim || !ingresarectivos.EstadoFi.trim){
      setError({
        error: true,
        text: "Debe llenar todos los campos",
      });
      return;  
    }
    try{
      await onAdd(ingresarectivos.Nombre, ingresarectivos.Sinonimos, ingresarectivos.NombreIn, ingresarectivos.Cas, ingresarectivos.EstadoFi, ingresarectivos.HojaSe, ingresarectivos.Cantidad)
      await uploadFile(file.filee, file.filename)
      setOpenAlert(true);
      setReactivos({
        Nombre: "",
        Sinonimos: "",
        NombreIn: "",
        Cas: "",
        EstadoFi: "",
        HojaSe: "",
        Cantidad: "",
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
    <Container >
      <Grid container sx={{ p: 10 }} spacing={6}>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField  required value={ingresarectivos.Nombre} fullWidth label="Nombre  Reactivo" name="Nombre" error={error.error} helperText={error.text} onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={ingresarectivos.Sinonimos} error={error.error} helperText={error.text} fullWidth label="Sinonimos" name="Sinonimos" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={ingresarectivos.NombreIn} error={error.error} helperText={error.text} fullWidth label="Nombre en Ingles" name="NombreIn" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={ingresarectivos.Cas} error={error.error} helperText={error.text}fullWidth label="Numero CAS" name="Cas" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <FormControl fullWidth required>
            <InputLabel error={error.error} helperText={error.text} id="select-label" >Estado Fisico</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="tipoDocumento"
              label="Estado Fisico"
              name="EstadoFi"
              onChange={handleChange}>
                    <MenuItem value={"Liquido"}>Liquido</MenuItem>
                    <MenuItem value={"Solido"}>Solido</MenuItem>
                    <MenuItem value={"Lodo"}>Lodo</MenuItem>
                    <MenuItem value={"Gas"}>Gas</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={ingresarectivos.Cantidad} error={error.error} helperText={error.text}fullWidth label="Cantidad" name="Cantidad" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" align="center" xs={12} sm={6}>
              Subir Hoja de Seguridad
        </Typography>
          <input type="file" name="file" id="file" onChange={(e) => setFile({...file, filee: e.target.files[0], filename:e.target.files[0].name})}/>
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
                    Reactivo Registrado Correctamente!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateReactivosForm;
