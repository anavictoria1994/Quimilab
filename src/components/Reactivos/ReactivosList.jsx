import React from "react";
import { forwardRef, useState } from "react";
import { useAuth } from "../../hooks/AuthContextReactivos";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Button,
  IconButton,
  Grid,
  InputBase,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Menu,
  MenuItem,
  TextField, 
  Modal,
  Typography,
  Box,
  Link,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  DialogActions
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CreateReactivosForm from "./CreateReactivosForm";
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const sytles ={
  color:"#dc3545",
}

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

const ActionsButtons = ({params, deleteData, updateData, uploadFile, updateDataHojaseguridad}) => {
  const [file, setFile] = useState({
    filename:"",
    filee:"",
  });

  const [openModal, setOpenModal] = useState(false);
  const [openModalHS, setOpenModalHS] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseModalHS = () => setOpenModalHS(false);
  const handleOpenModalHS = () => setOpenModalHS(true);
  const {value} = params
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenModal = () => setOpenModal(true);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [error,setError] = useState({});
  const handleOpenDialogDelete = () => setOpenDialogDelete(true);
  const handleCloseDialogDelete = () => setOpenDialogDelete(false);

  const [newReactivo, setNewReactivo] = useState({
    Nombre: params.row.nameReactivo,
    Sinonimos: params.row.sinonimoReactivo,
    NombreIn: params.row.NamIngle,
    Cas: params.row.casReactivo,
    EstadoFi: params.row.estadoFisico,
    Cantidadr:params.row.cantidadReactivos,
  });
  const [openAler, setOpenAlert] = useState(false);

  const handleCloseAlertDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertDelete(false);
  }; 

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      setOpenAlert(false);
  }; 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleChange = ({target: {name, value}}) =>{ 
    setNewReactivo({...newReactivo,[name]:value})
  };

  const handleBlur = (e) =>{
    handleChange(e);
    setError(validate(newReactivo));
  }

  const handleClickDelete = async(reactivoid) => {
    await deleteData(reactivoid)
    setAnchorEl(null);
    setOpenAlertDelete(true);
    
  };

  const handleClickEdit = async(reactivoid) => {
    setError(validate(newReactivo));
    if(Object.keys(error).length ===0){
    await updateData(reactivoid, newReactivo.Nombre, newReactivo.Sinonimos, newReactivo.NombreIn, newReactivo.Cas,newReactivo.EstadoFi, newReactivo.Cantidadr)
    }
    setAnchorEl(null);
    setOpenAlert(true);
  };

  const handleClickGuardar = async(reactivoid) => {
    const result = await uploadFile(file.filee, file.filename)
    await updateDataHojaseguridad(reactivoid, result)
    setOpenAlert(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const validate= (values)=> {
    const errors = {}
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexCas = /^\d{3}-\d{2}-\d{1}$/;
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
    }if(!values.Cantidadr){
      errors.Cantidadr = "El campo cantidad es requerido"
    }
    return errors;
  };

  return (
    <>
      <Button
        variant="text"
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
      >
        Acciones
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenModalHS}>Guardar Hoja Seguridad</MenuItem>
        <MenuItem onClick={handleOpenModal}>Editar</MenuItem>
        <MenuItem onClick={handleOpenDialogDelete}>Eliminar</MenuItem>
      </Menu>
      <div>
          <Modal
          open={openModalHS}
          onClose={handleCloseModalHS}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
            <Box sx={style}>
              <IconButton   onClick={handleCloseModalHS}>
                <CloseIcon />
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" xs={12} sm={6}>
                     Guardar Hoja de Seguridad
                </Typography>
                <input type="file" name="file" id="file" onChange={(e) => setFile({...file, filee: e.target.files[0], filename:e.target.files[0].name})}/>
                <Button onClick={()=> handleClickGuardar(value)} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >GUARDAR</Button>
                <Button onClick={handleCloseModalHS} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Cancelar</Button>
                <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert}  anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
                  <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                              Guardado Correctamente!
                  </Alert>
                </Snackbar>
            </Box>
        </Modal>
      </div>
      <div>
          <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
            <Box sx={style}>
              <IconButton   onClick={handleCloseModal}>
                <CloseIcon />
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" xs={12} sm={6}>
                     Editar Reactivo
                </Typography>
                <TextField margin="normal" required fullWidth  onBlur={handleBlur} defaultValue={params.row.nameReactivo} id= "Nombres" label="Nombre" name="Nombre"  
                    autoFocus onChange={handleChange}/>
                    {error.Nombre && <p style={sytles}>{error.Nombre}</p>}
                <TextField margin="normal" required fullWidth onBlur={handleBlur} defaultValue={params.row.sinonimoReactivo} id="Sinonimos" label="Sinonimos" name="Sinonimos" 
                    autoFocus onChange={handleChange} />
                    {error.Sinonimos && <p style={sytles}>{error.Sinonimos}</p>}
                <Grid item xs={12} md={6} sx={{ my: 2 }}>
                <FormControl fullWidth required onBlur={handleBlur} >
                  <InputLabel error={error.error} helperText={error.text} id="select-label" >Estado Fisico</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="tipoDocumento"
                    label="Estado Fisico"
                    name="EstadoFi"
                    defaultValue={params.row.estadoFisico}
                    onChange={handleChange}>
                      <MenuItem value={"Liquido"}>Liquido</MenuItem>
                      <MenuItem value={"Solido"}>Solido</MenuItem>
                      <MenuItem value={"Lodo"}>Lodo</MenuItem>
                      <MenuItem value={"Gas"}>Gas</MenuItem>
                  </Select>
                </FormControl>
                {error.EstadoFi && <p style={sytles}>{error.EstadoFi}</p>}
                </Grid>
                <TextField margin="normal" required fullWidth onBlur={handleBlur} defaultValue={params.row.NamIngle} id="NombreIn" label="Nombre Ingles" name="NombreIn"  
                    autoFocus onChange={handleChange} />
                    {error.NombreIn && <p style={sytles}>{error.NombreIn}</p>}
                <TextField margin="normal" required fullWidth onBlur={handleBlur} defaultValue={params.row.casReactivo} id="Cas" label="cas" name="Cas"  
                    autoFocus onChange={handleChange} />
                    {error.Cas && <p style={sytles}>{error.Cas}</p>}
                <TextField margin="normal" required fullWidth onBlur={handleBlur} defaultValue={params.row.cantidadReactivos} id="Cantidadr" label="Cantidad" name="Cantidadr"  
                    autoFocus onChange={handleChange} />
                    {error.Cantidadr && <p style={sytles}>{error.Cantidadr}</p>}
                <Button onClick={()=> handleClickEdit(value)} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Editar</Button>
                <Button onClick={handleCloseModal} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Cancelar</Button>
                <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
                  <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                              Reactivo Editado Correctamente!
                  </Alert>
                </Snackbar>
            </Box>
        </Modal>
      </div>
      <div>
      <Dialog
          open={openDialogDelete}
          onClose={handleCloseDialogDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Estás seguro?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Este Reactivo se elimarará definitivamente 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> handleClickDelete(value)}>Eliminar</Button>
            <Button onClick={handleCloseDialogDelete} autoFocus> Cancelar </Button>
            <Snackbar open={openAlertDelete} autoHideDuration={4000} onClose={handleCloseAlertDelete} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
              <Alert onClose={handleCloseAlertDelete} severity="success" sx={{ width: '100%'}}>
                Reactivo Eliminado Correctamente!
              </Alert>
            </Snackbar>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
  
const ReactivosList = () => {
   
    const {reactivos, deleteData, addData, updateData, uploadFile, updateDataHojaseguridad} = useAuth();
    const [openAler, setOpenAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const handleChange =(evento) =>{
      setSearch(evento.target.value)
    }

    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    }; 
    
    const openDialogCreate = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const columns = [
      { field: "id", headerName: "ID", width: 40 },
      { field: "nameReactivo", headerName: "Nombre", width: 160, editable: true },
      { field: "sinonimoReactivo", headerName: "Sinonimos", width: 150, editable: true },
      { field: "estadoFisico", headerName: "Estado Fisico", width: 140, editable: true },
      { field: "NamIngle", headerName: "Nombre Ingles", width: 150, editable: true },
      { field: "casReactivo", headerName: "CAS", width: 150, editable: true },
      { field: "hojaSeguridad", 
        headerName: "Hoja Seguridad", 
        width: 200, 
        
        renderCell: (parametros) =>  <Link  href={parametros.row.hojaSeguridad}> {parametros.row.hojaSeguridad}</Link>,
      },
      { field: "cantidadReactivos", headerName: "Cantidad", width: 140, editable: true },
      {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        renderCell: (parametros) => <ActionsButtons  params={parametros} deleteData={deleteData} updateData={updateData} uploadFile={uploadFile} updateDataHojaseguridad={updateDataHojaseguridad}/>,
      },
    ];
    
    const rows =  reactivos.filter(dato=>dato.Nombre.toLowerCase().includes(search)).map((item, indice) => {
      
      return {
          id: indice,
          nameReactivo: item.Nombre,
          sinonimoReactivo: item.Sinonimo,
          estadoFisico: item.EstadoFisico,
          hojaSeguridad: item.HojaSeguridad,
          casReactivo: item.Cas,
          NamIngle: item.NombreIngles,
          actions: item.id,
          cantidadReactivos: item.CantidadR      
      }
    })
    
    
    return (
      <Container sx={{ my: 3 }}>
        <Card elevation={5}>
          <CardHeader title="Reactivos" sx={{ textAlign: "center" }} />
          <CardContent>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item md={2} sx={{ flexGrow: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "#FF0000",
                    color: "white",
                    mb: 2,
                    "&:hover": { bgcolor: "#9d0000" },
                  }}
                  onClick={() => openDialogCreate()}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
              </Grid>
              <Grid item md={4}>
                <Paper
                  component="form"
                  sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Buscar Reactivo"
                    inputProps={{ "aria-label": "search google maps" }}
                    value={search}
                    onChange={handleChange}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <DataGrid
              rows={rows}
              columns={columns}
              heckboxSelection
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              rowsPerPageOptions={[5,10]}
              disableRowSelectionOnClick
              editMode={true}
            />
          </CardContent>
        </Card>
        <Dialog open={open} onClose={() => handleClose()} fullScreen sx={{mx:{xs: 4, md:20}, my:{xs:4,md:10}} } >
        <Box>
        <IconButton  onClick={handleClose} >
            <CloseIcon />
        </IconButton>
        </Box>
          <DialogTitle sx={{ textAlign: "center" }}>
            Registro de Reactivos
          </DialogTitle>
          <DialogContent>
            <CreateReactivosForm onAdd={addData}/>
            <Grid item xs={12} md={6} sx={{ my: 3, textAlign:"center" }}>
              <Button variant="contained" onClick={handleClose}  sx={{width:"82%", bgcolor: "#FF0000", color: "white",
                "&:hover": { bgcolor: "#9d0000" },}}>Cerrar</Button>
            </Grid>
          </DialogContent>
        </Dialog>
        <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Reactivo Eliminado Correctamente!
        </Alert>
      </Snackbar>
      </Container>
    );
};

export default ReactivosList;
