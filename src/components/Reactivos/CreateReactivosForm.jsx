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

const sytles ={
  color:"#dc3545",
}


const CreateReactivosForm = ({onAdd}) => {
  const [openAler, setOpenAlert] = useState(false);

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
  });
  
  const [error,setError] = useState({
    error: false,
    text:"",
    
  });

  const handleChange = ({target: {name, value}}) =>{ 
    setReactivos({...ingresarectivos,[name]:value})
  };

  const handleBlur = (e) =>{
    handleChange(e);
    setError(validate(ingresarectivos));
  }
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError(validate(ingresarectivos));
    if(Object.keys(error).length ===0){
      try{
        await onAdd(ingresarectivos.Nombre, ingresarectivos.Sinonimos, ingresarectivos.NombreIn, ingresarectivos.Cas, ingresarectivos.EstadoFi, ingresarectivos.HojaSe)
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
      return;
    }  
  }

  const validate= (values)=> {
    const errors = {}
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexCas = /^\d{3}-\d{3}-\d{3}$/;
    if(!values.Nombre){
      errors.Nombre = "El campo nombre es requerido"
    }else if(!regexName.test(values.Nombre)){
      errors.Nombre = "El campo nombre sólo acepta letras y espacios en blanco"
    }if(!values.Sinonimos){
      errors.Sinonimos = "El campo sinónimos es requerido"
    }else if(!regexName.test(values.Sinonimos)){
      errors.Sinonimos = "El campo sinónimos sólo acepta letras y espacios en blanco"
    }if(!values.NombreIn){
      errors.NombreIn = "El campo nombre en inglés es requerido"
    }else if(!regexName.test(values.NombreIn)){
      errors.NombreIn = "El campo nombre en inglés sólo acepta letras y espacios en blanco"
    }if(!values.Cas){
      errors.Cas = "El campo número CAS es requerido"
    }else if(!regexCas.test(values.Cas)){
      errors.Cas = "El campo Cas solo acepta el formato xxx-xxx-xxx y no acepta letras "
    }if(!values.EstadoFi){
      errors.EstadoFi = "El campo estado fisico es requerido"
    }if(!values.HojaSe){
      errors.HojaSe = "El campo hoja de seguridad es requerido"
    }

    return errors;
  };

  return (
    <Container >
      <Grid container sx={{ p: 10 }} spacing={6}>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required onBlur={handleBlur} value={ingresarectivos.Nombre} fullWidth label="Nombre  Reactivo" name="Nombre" onChange={handleChange}/>
          {error.Nombre && <p style={sytles}>{error.Nombre}</p>}
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required onBlur={handleBlur} value={ingresarectivos.Sinonimos}  fullWidth label="Sinónimos" name="Sinonimos" onChange={handleChange}/>
          {error.Sinonimos && <p style={sytles}>{error.Sinonimos}</p>}
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required onBlur={handleBlur} value={ingresarectivos.NombreIn} fullWidth label="Nombre en Inglés" name="NombreIn" onChange={handleChange}/>
          {error.NombreIn && <p style={sytles}>{error.NombreIn}</p>}
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <TextField required onBlur={handleBlur} value={ingresarectivos.Cas} fullWidth label="Número CAS" name="Cas" onChange={handleChange}/>
          {error.Cas && <p style={sytles}>{error.Cas}</p>}
        </Grid>
        
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <FormControl fullWidth required onBlur={handleBlur} >
            <InputLabel id="select-label" >Estado Fisico</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="tipoDocumento"
              label="Estado Fisico"
              name="EstadoFi"
              value={ingresarectivos.EstadoFi}
              onChange={handleChange}>
                    <MenuItem value={"Liquido"}>Liquido</MenuItem>
                    <MenuItem value={"Solido"}>Solido</MenuItem>
                    <MenuItem value={"Lodo"}>Lodo</MenuItem>
                    <MenuItem value={"Gas"}>Gas</MenuItem>
            </Select>
          </FormControl>
          {error.EstadoFi && <p style={sytles}>{error.EstadoFi}</p>}
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 2 }}>
          <FormControl onBlur={handleBlur}fullWidth required>
            <InputLabel id="select-label" >Hoja de Seguridad</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="hojaSeguridad"
              label="Hoja de Seguridad"
              name="HojaSe"
              value={ingresarectivos.HojaSe}
              onChange={handleChange}>
                    <MenuItem value={"Si"}>Si</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
            </Select>
          </FormControl>
          {error.HojaSe && <p style={sytles}>{error.HojaSe}</p>}
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 3, textAlign:"center" }}>
          <Button onClick={handleSubmit} variant="contained"  sx={{width:"30%", bgcolor: "#FF0000",  color: "white",
              "&:hover": { bgcolor: "#9d0000" },}}>Registrar</Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 3, textAlign:"center" }}>
          <Button variant="contained"  sx={{width:"30%", bgcolor: "#FF0000",  color: "white",
              "&:hover": { bgcolor: "#9d0000" },}}>Cerrar</Button>
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
