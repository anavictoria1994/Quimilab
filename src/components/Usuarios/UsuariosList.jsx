import React from "react";
import { forwardRef,useState } from "react";
import { useAuth } from "../../hooks/AuthContextUsuarios";
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
  FormControl,
  InputLabel,
  Select,
  Box
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CreateUsuariosForm from "./CreateUsuariosForm";
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const ActionsButtons = ({params, deleteData, updateData}) => {
 
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const {value} = params
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenModal = () => setOpenModal(true);

  const [newUsuario, setNewUsurio] = useState({
    nombreUsu: params.row.nombreUsuario,
    apellidosUsu: params.row.apellidoUsuario,
    tipoDocumentousu: params.row.tipoDocumento,
    docuentoUsu: params.row.documentoUsurio,
    telefonoUsu: params.row.telefonoUsuario,
    emailUsu: params.row.correoUsurio,
    cargoUsu:params.row.cargoUsurio,
    rolUsu:params.row.rolUsuario,
  });
  const [openAler, setOpenAlert] = useState(false);
   
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
    setNewUsurio({...newUsuario,[name]:value})
  };

  const handleClickDelete = async(usurioid) => {
    if(window.confirm("Esta seguro de querer Eliminar este Usuario?")){
      await deleteData(usurioid)
    }
    setAnchorEl(null);
  };

  const handleClickEdit = async(usurioid) => {
   try {
    await updateData(usurioid, newUsuario.nombreUsu, newUsuario.apellidosUsu, newUsuario.tipoDocumentousu ,newUsuario.docuentoUsu, newUsuario.telefonoUsu,newUsuario.emailUsu, newUsuario.cargoUsu, newUsuario.rolUsu)
    setOpenAlert(true);
    setAnchorEl(null);
   } catch (error) {
    console.log(error.Code);
    console.log("problemas con la edicion")
   }
   
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleOpenModal}>Editar</MenuItem>
        <MenuItem onClick={()=> handleClickDelete(value)}>Eliminar</MenuItem>
      </Menu>
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
                     Editar Usuario
                </Typography>
                <Grid item xs={12} md={6} sx={{ my: 2 }}>
                <TextField margin="normal" required fullWidth  defaultValue={params.row.nombreUsuario} id= "Nombres" label="Nombre" name="nombreUsu"  
                    autoFocus onChange={handleChange}/>
                </Grid>
                <TextField margin="normal" required fullWidth  defaultValue={params.row.apellidoUsuario} id="apellidos" label="Apellidos" name="apellidosUsu" 
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth  defaultValue={params.row.tipoDocumento} id="tipoDocumentousu" label="Tipo Documento" name="tipoDocumentousu"  
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth  defaultValue={params.row.documentoUsurio} id="documento" label="Documento" name="docuentoUsu"  
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth  defaultValue={params.row.telefonoUsuario} id="telefonoUsu" label="Telefono" name="telefonoUsu"  
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth  defaultValue={params.row.correoUsurio} id="emailUsu" label="Email" name="emailUsu"  
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth  defaultValue={params.row.cargoUsurio} id="cargoUsu" label="Cantidad" name="cargoUsu"  
                    autoFocus onChange={handleChange} />
                <Grid item xs={12} md={6} sx={{ my: 2 }}>
                <FormControl fullWidth required>
                  <InputLabel  id="select-label" >Rol</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="rolUsu"
                  label="Rol"
                  name="rolUsu"
                  defaultValue={params.row.rolUsuario}
                  onChange={handleChange}>
                    <MenuItem value={"Administrador"}>Administrador</MenuItem>
                    <MenuItem value={"Operador"}>Operador</MenuItem>
                    <MenuItem value={"Invitado"}>Invitado</MenuItem>
                    <MenuItem value={"Generador"}>Generador</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Button onClick={()=> handleClickEdit(value)} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Editar</Button>
                <Button onClick={handleCloseModal} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Cancelar</Button>
                <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
                  <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                              Usuario Editado Correctamente!
                  </Alert>
                </Snackbar>
            </Box>
        </Modal>
      </div>
    </>
  )
}
  
const UsuariosList = () => {
   
    const {usuarioRegistrados, deleteData, registro, updateData} = useAuth();
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
      { field: "nombreUsuario", headerName: "Nombre", width: 160, editable: true },
      { field: "apellidoUsuario", headerName: "Apellido", width: 150, editable: true },
      { field: "tipoDocumento", headerName: "Tipo Docu", width: 150, editable: true },
      { field: "documentoUsurio", headerName: "Documento", width: 150, editable: true },
      { field: "telefonoUsuario", headerName: "Telefono", width: 150, editable: true },
      { field: "correoUsurio", headerName: "Correo", width: 150, editable: true },
      { field: "cargoUsurio", headerName: "Cargo", width: 150, editable: true },
      { field: "rolUsuario", headerName: "Rol", width: 150, editable: true },
      {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        renderCell: (parametros) => <ActionsButtons  params={parametros} deleteData={deleteData} updateData={updateData} />,
      },
    ];
    
    const rows =  usuarioRegistrados.filter(dato=>dato.nombre.toLowerCase().includes(search)).map((item, indice) => {
      
      return {
          id: indice,
          nombreUsuario: item.nombre,
          apellidoUsuario: item.apellidos,
          documentoUsurio: item.numDocumento,
          tipoDocumento: item.tipoDocumento,
          telefonoUsuario: item.telefono,
          correoUsurio: item.email,
          cargoUsurio: item.cargo,
          actions: item.id,
          rolUsuario: item.rol      
      }
    })
    
    
    return (
      <Container sx={{ my: 3 }}>
        <Card elevation={5}>
          <CardHeader title="Usuarios" sx={{ textAlign: "center" }} />
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
                    placeholder="Buscar Usuario"
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
            Registro de Usuario
          </DialogTitle>
          <DialogContent>
            <CreateUsuariosForm onAdd={registro}/>
          </DialogContent>
        </Dialog>
        <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                      Usuario Eliminado Correctamente!
        </Alert>
      </Snackbar>
      </Container>
    );
};

export default UsuariosList;
