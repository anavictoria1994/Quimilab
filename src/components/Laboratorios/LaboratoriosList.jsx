import React from "react";
import { forwardRef,useState } from "react";
import { useAuth } from "../../hooks/AuthContextLaboratorios";
import {
  Card,
  CardContent,
  CardHeader,
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
  DialogContentText,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CreateLaboratoriosForm from "./CreateLaboratoriosForm";
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
  const {value} = params
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [newLaboratorio, setNewLaboratorio] = useState({
    fechaRegistro: params.row.Fecha ,
    nombreLaboratorio: params.row.NombreLab,
    coordinador: params.row.Coord,
    telefono: params.row.Tel,
    email: params.row.Correo,
  });
  const [openAler, setOpenAlert] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

  const handleOpenMOdal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenDialogDelete = () => setOpenDialogDelete(true);
  const handleCloseDialogDelete = () => setOpenDialogDelete(false);
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
    setNewLaboratorio({...newLaboratorio,[name]:value})
  };

  const handleClickDelete = async(laboratorioid) => {
    await deleteData(laboratorioid);
    setOpenAlert(true);
    setAnchorEl(null);
  };

  const handleClickEdit = async(laboratorioid) => {
    await updateData(laboratorioid, newLaboratorio.fechaRegistro, newLaboratorio.nombreLaboratorio, newLaboratorio.coordinador, newLaboratorio.telefono,newLaboratorio.email)
    setOpenAlert(true);
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
        <MenuItem onClick={handleOpenMOdal}>Editar</MenuItem>
        <MenuItem onClick={handleOpenDialogDelete}>Eliminar</MenuItem>
      </Menu>
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
                     Editar Laboratorio
                </Typography>
                <TextField margin="normal" required fullWidth value={newLaboratorio.fechaRegistro} defaultValue={params.row.Fecha} id="fechaRegistro" label="Fecha de registro" name="fechaRegistro"  
                    autoFocus onChange={handleChange}/>
                <TextField margin="normal" required fullWidth value={newLaboratorio.nombreLaboratorio} defaultValue={params.row.NombreLab} id="nombreLaboratorio" label="Nombre de laboratorio" name="nombreLaboratorio" 
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth value={newLaboratorio.coordinador} defaultValue={params.row.Coord} id="coordinador" label="Coordinador" name="coordinador"  
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth value={newLaboratorio.telefono} defaultValue={params.row.Tel} id="telefono" label="Teléfono" name="telefono"  
                    autoFocus onChange={handleChange} />
                <TextField margin="normal" required fullWidth value={newLaboratorio.email} defaultValue={params.row.Correo} id="email" label="Email" name="email"  
                    autoFocus onChange={handleChange} />
                <Button onClick={()=> handleClickEdit(value)} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Editar</Button>
                <Button onClick={handleCloseModal} type="submit" color="inherit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "#FF0000"}} >Cancelar</Button>             
                <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
                  <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%'}}>
                    Laboratorio Editado Correctamente!
                  </Alert>
                </Snackbar>
            </Box>           
        </Modal>
        
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
              Este laboratorio se elimarará definitivamente 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> handleClickDelete(value)}>Eliminar</Button>
            <Button onClick={handleCloseDialogDelete} autoFocus>
              Cancelar
            </Button>
            <Snackbar open={openAler} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
            <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
              Laboratorio Eliminado Correctamente!
            </Alert>
          </Snackbar>
          </DialogActions>
          
        </Dialog>
        
      </div>
    </>
  )
}
  
const LaboratoriosList = () => {
    const {laboratorios, deleteData, addData, updateData} = useAuth();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const handleChange =(evento) =>{
        setSearch(evento.target.value)
    }

    const openDialogCreate = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "Fecha", headerName: "Fecha de registro", width: 160, editable: true },
      { field: "NombreLab", headerName: "Nombre del laboratorio", width: 150, editable: true },
      { field: "Coord", headerName: "Coordinador", width: 140, editable: true },
      { field: "Tel", headerName: "Teléfono", width: 150, editable: true },
      { field: "Correo", headerName: "Email", width: 150, editable: true },
      {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        renderCell: (parametros) => <ActionsButtons  params={parametros} deleteData={deleteData} updateData={updateData}/>,
      },
    ];
    
    const rows =  laboratorios.filter(dato=>dato.nombreLaboratorio.toLowerCase().includes(search)).map((item, indice) => {
      
      return {
          id: indice,
          Fecha: item.fechaRegistro,
          NombreLab: item.nombreLaboratorio,
          Coord: item.coordinador,
          Tel: item.telefono,
          Correo: item.email,
          actions: item.id,      
      }
    })
    
    return (
      <div>
        <Card elevation={5}>
          <CardHeader title="Laboratorios" sx={{ textAlign: "center" }} />
          <CardContent>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item md={2} sx={{ flexGrow: 1 }}>
                <Tooltip title="Agregar Laboratorio" arrow>
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
              
                </Tooltip>
              </Grid>
              <Grid item md={4}>
                <Paper
                  component="form"
                  sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Buscar Laboratorio"
                    inputProps={{ "aria-label": "search google maps" }}
                    value={search}
                    onChange={handleChange}
                  />
                  <Tooltip title="Buscar Laboratorio" arrow>
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
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
              checkboxSelection
              disableRowSelectionOnClick
              editMode={true}
            />
          </CardContent>
        </Card>
        <Dialog open={open} onClose={() => handleClose()} PaperProps={{sx: {position:'relative', top:0, left:50, m:0, width:'30%', height:'100%'}}}>
        <Box>
        <IconButton  onClick={handleClose} >
            <CloseIcon />
        </IconButton>
        </Box>
          <DialogTitle sx={{ position:'relative',top:0, m:0, textAlign: "center" }}>
            Registro de Laboratorios
          </DialogTitle>
          <DialogContent>
            <CreateLaboratoriosForm onAdd={addData}/>
          </DialogContent>
        </Dialog>
      </div>
    );
};

export default LaboratoriosList;