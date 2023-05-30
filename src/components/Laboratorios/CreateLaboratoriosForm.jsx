import {
    Button,
    Grid,
    TextField,
    Container,
    Box,
    
  } from "@mui/material";
  import React, { useState } from "react";
  import Snackbar from '@mui/material/Snackbar';
  import MuiAlert from '@mui/material/Alert';

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const sytles ={
    color:"#dc3545",
  }
  
  const CreateLaboratoriosForm = ({onAdd}) => {
    const [openAler, setOpenAlert] = useState(false);
    const initialValues = {
      fechaRegistro: "",
      nombreLaboratorio: "",
      coordinador: "",
      telefono: "",
      email: "",}
    const [ingresarLaboratorios, setLaboratorios] = useState({initialValues});
    const [error,setError] = useState({});

    const handleChange = ({target: {name, value}}) =>{ 
      setLaboratorios({...ingresarLaboratorios,[name]:value})
    };

    const handleBlur = (e) =>{
      handleChange(e);
      setError(validate(ingresarLaboratorios));
    }
    
    const handleSubmit = async(e) =>{
      e.preventDefault();
      setError(validate(ingresarLaboratorios));
      if(Object.keys(error).length ===0){
        try{
          await onAdd(ingresarLaboratorios.fechaRegistro, ingresarLaboratorios.nombreLaboratorio, ingresarLaboratorios.coordinador, ingresarLaboratorios.telefono, ingresarLaboratorios.email)
          setOpenAlert(true);

          setLaboratorios({
            fechaRegistro: "",
            nombreLaboratorio: "",
            coordinador: "",
            telefono: "",
            email: "",
          });

        }catch(error){
          console.log(error.Code);
          setError({
            error: true,
            text:"Problemas con el registro",
          });                
        }
      }
    }

    const validate= (values)=> {
      const errors = {}
      const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      const regexEmail = /^[A-Z0-9._%+-]+@[correounivalle]+\.[edu]+\.[co]/i;
      
      if(!values.fechaRegistro){
        errors.fechaRegistro = "El campo fecha de registro es requerido"
      } if(!values.nombreLaboratorio){
        errors.nombreLaboratorio = "El campo nombre del laboratorio es requerido"
      }else if(!regexName.test(values.nombreLaboratorio)){
        errors.nombreLaboratorio = "El campo nombre de laboratorio sólo acepta letras y espacios en blanco"
      }
      if(!values.coordinador){
        errors.coordinador = "El campo coordinador es requerido"
      }else if(!regexName.test(values.coordinador)){
        errors.coordinador = "El campo coordinador sólo acepta letras y espacios en blanco"
      }if(!values.email){
        errors.email = "El campo email es requerido"
      }else if(!regexEmail.test(values.email)){
        errors.email = "Este no es un formato válido para el campo email"
      }if(!values.telefono){
        errors.telefono = "El campo teléfono es requerido"
      }else if(values.telefono.length < 7){
        errors.telefono = "El campo teléfono debe tener más de 7 dígitos"
      }else if(values.telefono.length > 10){
        errors.telefono = "El campo teléfono no puede tener más de 10 digitos"
      }
      return errors;
    };

    return (
      <Box noValidate
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 'auto',
        width: 'fit-content',
      }}>
        <Container >
        <Grid container sx={{ p: 1 }} spacing={1}>
          <Grid item xs={12}>
            <TextField  required onBlur={handleBlur} type="date" value={ingresarLaboratorios.fechaRegistro} fullWidth  name="fechaRegistro"  onChange={handleChange}/>
            {error.fechaRegistro && <p style={sytles}>{error.fechaRegistro}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField required onBlur={handleBlur} value={ingresarLaboratorios.nombreLaboratorio} fullWidth label="Nombre del laboratorio" name="nombreLaboratorio" onChange={handleChange} />
            {error.nombreLaboratorio && <p style={sytles }>{error.nombreLaboratorio}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField required onBlur={handleBlur} value={ingresarLaboratorios.coordinador} fullWidth label="Coordinador" name="coordinador" onChange={handleChange}/>
            {error.coordinador && <p style={sytles}>{error.coordinador}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField required onBlur={handleBlur} value={ingresarLaboratorios.telefono} fullWidth label="Teléfono" name="telefono" onChange={handleChange}/>
            {error.telefono && <p style={sytles}>{error.telefono}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField required onBlur={handleBlur} value={ingresarLaboratorios.email} fullWidth label="Email" name="email" onChange={handleChange}/>
            {error.email && <p style={sytles}>{error.email}</p>}
          </Grid>       
          <Grid item xs={12} sx={{ textAlign:"center" }}>
            <Button type="submit" onClick={handleSubmit} variant="contained"  sx={{width:"100%", bgcolor: "#FF0000"}}>Registrar</Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign:"center" }}>
            <Button variant="contained"  sx={{width:"100%", bgcolor: "#FF0000"}}>Cerrar</Button>
          </Grid>
        </Grid>
        <Snackbar open={openAler} autoHideDuration={4000} onClose={()=>setOpenAlert(false)} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
          <Alert severity="success" onClose={()=>setOpenAlert(false)} sx={{ width: '100%' }}>
              Laboratorio Registrado Correctamente!
          </Alert>
        </Snackbar>
      </Container>
      </Box>
      
    );
  };

  export default CreateLaboratoriosForm;