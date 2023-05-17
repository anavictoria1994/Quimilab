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
import React, { forwardRef,useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateReactivosForm = ({onAdd}) => {
  const [openAler, setOpenAlert] = useState(false);

  const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
  };  
  
  const [rectivos, setReactivos] = useState({
    Nombre: "",
    Sinonimos: "",
    NombreIn: "",
    Cas: "",
    EstadoFi: "",
    HojaSe: "",
  });
  
  const [error,setError] = useState({
    error: false,
    text:"",
    
  });

  const handleChange = ({target: {name, value}}) =>{ 
    setReactivos({...rectivos,[name]:value})
  };
  
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try{
      await onAdd(rectivos.Nombre, rectivos.Sinonimos, rectivos.NombreIn, rectivos.Cas, rectivos.EstadoFi, rectivos.HojaSe)
      setOpenAlert(true);
      setReactivos({
        Nombre: "",
        Sinonimos: "",
        NombreIn: "",
        Cas: "",
        EstadoFi: "",
        HojaSe: "",
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
          <TextField  required value={rectivos.Nombre} fullWidth label="Nombre  Reactivo" name="Nombre" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={rectivos.Sinonimos} fullWidth label="Sinonimos" name="Sinonimos" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={rectivos.NombreIn} fullWidth label="Nombre en Ingles" name="NombreIn" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required value={rectivos.Cas} fullWidth label="Numero CAS" name="Cas" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <FormControl fullWidth required>
            <InputLabel id="select-label" >Estado Fisico</InputLabel>
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
          <FormControl fullWidth required>
            <InputLabel id="select-label" >Hoja de Seguridad</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="hojaSeguridad"
              label="Hoja de Seguridad"
              name="HojaSe"
              onChange={handleChange}>
                    <MenuItem value={"Si"}>Si</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
            </Select>
          </FormControl>
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
