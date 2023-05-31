import React from "react";
import { forwardRef,useState } from "react";
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
  const [newReactivo, setNewReactivo] = useState({
    Nombre: params.row.nameReactivo,
    Sinonimos: params.row.sinonimoReactivo,
    NombreIn: params.row.NamIngle,
    Cas: params.row.casReactivo,
    EstadoFi: params.row.estadoFisico,
    HojaSe: params.row.hojaSeguridad,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleChange = ({target: {name, value}}) =>{ 
    setNewReactivo({...newReactivo,[name]:value})
  };

  const handleClickDelete = async(reactivoid) => {
    if(window.confirm("Esta seguro de querer Eliminar este reactivo?")){
      await deleteData(reactivoid)
    }
    setAnchorEl(null);
  };

  const handleClickEdit = async(reactivoid) => {
   
    await updateData(reactivoid, newReactivo.Nombre, newReactivo.Sinonimos, newReactivo.NombreIn, newReactivo.Cas,newReactivo.EstadoFi, newReactivo.HojaSe)
    console.log("se edito correctamente")
    setAnchorEl(null);
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
                     Editar Reactivo
                </Typography>
                <TextField margin="normal" required fullWidth  defaultValue={params.row.nameReactivo} id= "Nombres" label="Nombre" name="Nombre"  
                    autoFocus onChange={handleChange}/>
                <TextField margin="normal" required fullWidth  defaultValue={params.row.sinonimoReactivo} id="Sinonimos" label="Sinonimos" name="Sinonimos" 
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth  defaultValue={params.row.estadoFisico} id="EstadoFi" label="Estado Fisico" name="EstadoFi"  
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth  defaultValue={params.row.NamIngle} id="NombreIn" label="Nombre Ingles" name="NombreIn"  
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth  defaultValue={params.row.casReactivo} id="Cas" label="cas" name="Cas"  
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth  defaultValue={params.row.hojaSeguridad} id="HojaSe" label="Hoja de seguridad" name="HojaSe"  
                    autoFocus onChange={handleChange} />
                <Button onClick={()=> handleClickEdit(value)} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Editar</Button>
                <Button onClick={handleCloseModal} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Cancelar</Button>
            </Box>
        </Modal>
      </div>
    </>
  )
}
  
const ReactivosList = () => {
   
    const {reactivos, deleteData, addData, updateData} = useAuth();
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
      { field: "id", headerName: "ID", width: 70 },
      { field: "nameReactivo", headerName: "Nombre", width: 160, editable: true },
      { field: "sinonimoReactivo", headerName: "Sinonimos", width: 150, editable: true },
      { field: "estadoFisico", headerName: "Estado Fisico", width: 140, editable: true },
      { field: "NamIngle", headerName: "Nombre Ingles", width: 150, editable: true },
      { field: "casReactivo", headerName: "CAS", width: 150, editable: true },
      { field: "hojaSeguridad", headerName: "Hoja Seguridad", width: 140, editable: true },
      {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        renderCell: (parametros) => <ActionsButtons  params={parametros} deleteData={deleteData} updateData={updateData}/>,
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
