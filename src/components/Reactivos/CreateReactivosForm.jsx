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
import React, { useState } from "react";



const CreateReactivosForm = () => {

  const [rectivos, setReactivos] = useState({
    Nombre: "",
    Sinonimos: "",
    NombreIn: "",
    Cas: "",
    EstadoFi: "",
    HojaSe: "",
  });
  
  const handleChange = ({target: {name, value}}) =>{ 
    setReactivos({...rectivos,[name]:value})
  };

  return (
    <Container >
      <Grid container sx={{ p: 3 }} spacing={1}>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField  required fullWidth label="Nombre  Reactivo" name="Nombre" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField required fullWidth label="Sinonimos" name="Sinonimos" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField required fullWidth label="Nombre en Ingles" name="NombreIn" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField required fullWidth label="Numero CAS" name="Cas" onChange={handleChange}/>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
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
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
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
          <Button variant="contained" color="success" sx={{width:"30%", bgcolor: "#FF0000"}}>Registrar</Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 3, textAlign:"center" }}>
          <Button variant="contained" color="success" sx={{width:"30%", bgcolor: "#FF0000"}}>Cerrar</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateReactivosForm;
