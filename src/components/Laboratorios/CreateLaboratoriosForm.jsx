import {
    Button,
    Grid,
    TextField,
    Container,
    
  } from "@mui/material";
  import React, { forwardRef,useState } from "react";
  import Snackbar from '@mui/material/Snackbar';
  import MuiAlert from '@mui/material/Alert';
  
  const Alert = forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const CreateLaboratoriosForm = ({onAdd}) => {
    const [openAler, setOpenAlert] = useState(false);
  
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };  
    
    const [ingresarLaboratorios, setLaboratorios] = useState({
      fechaRegistro: "",
      nombreLaboratorio: "",
      coordinador: "",
      telefono: "",
      email: "",
    });
    
    const [error,setError] = useState({
      error: false,
      text:"",
      
    });
  
    const handleChange = ({target: {name, value}}) =>{ 
      setLaboratorios({...ingresarLaboratorios,[name]:value})
    };
    
    const handleSubmit = async(e) =>{
      e.preventDefault();
      //agregar los otros datos
      if(!ingresarLaboratorios.nombreLaboratorio.trim() || !ingresarLaboratorios.coordinador.trim || !ingresarLaboratorios.telefono.trim){
        setError({
          error: true,
          text: "Debe llenar todos los campos",
        });
        return;  
      }
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
    return (
      <Container >
        <Grid container sx={{ p: 3 }} spacing={2}>
          <Grid item xs={12} md={6} sx={{ my: 2 }}>
            <TextField  required value={ingresarLaboratorios.fechaRegistro} fullWidth label="Fecha de registro" name="fechaRegistro" error={error.error} helperText={error.text} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} md={6} sx={{ my: 2 }}>
            <TextField required value={ingresarLaboratorios.nombreLaboratorio} error={error.error} helperText={error.text} fullWidth label="Nombre del laboratorio" name="nombreLaboratorio" onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} md={6} sx={{ my: 2 }}>
            <TextField required value={ingresarLaboratorios.coordinador} error={error.error} helperText={error.text} fullWidth label="Coordinador" name="coordinador" onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} md={6} sx={{ my: 2 }}>
            <TextField required value={ingresarLaboratorios.telefono} error={error.error} helperText={error.text}fullWidth label="Teléfono" name="telefono" onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} md={6} sx={{ my: 2 }}>
            <TextField required value={ingresarLaboratorios.email} error={error.error} helperText={error.text}fullWidth label="Email" name="email" onChange={handleChange}/>
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
                      Laboratorio Registrado Correctamente!
          </Alert>
        </Snackbar>
      </Container>
    );
  };

  export default CreateLaboratoriosForm;