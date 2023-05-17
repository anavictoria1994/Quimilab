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

  
const ReactivosList = () => {
    
    const {reactivos, loading, deleteData, addData } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [open, setOpen] = useState(false);
    const [openAler, setOpenAlert] = useState(false);

    if(loading.getData) return<p>Cargando Informacion</p>

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClickDelete = async(reactivoid) => {
      await deleteData(reactivoid)
      setAnchorEl(null);
    };

    const handleClickEdit = (reactivoid) => {
      console.log(reactivoid)
      setAnchorEl(null);
    };

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
      { field: "shippingDate", headerName: "Nombre", width: 160 },
      { field: "stage", headerName: "Sinonimos", width: 150 },
      { field: "place", headerName: "Estado Fisico", width: 140 },
      { field: "NamIngle", headerName: "Nombre Ingles", width: 150 },
      { field: "waste", headerName: "CAS", width: 150 },
      { field: "containersQuantity", headerName: "Hoja Seguridad", width: 140 },
      {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        renderCell: (parametros) => {
          
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
              <MenuItem onClick={()=> handleClickEdit(parametros.row.uid)}>Editar</MenuItem>
              <MenuItem onClick={()=> handleClickDelete(parametros.row.uid)}>Eliminar</MenuItem>
            </Menu>
            
          </>
        )},
      },
    ];
    const rows =  reactivos.map((item, indice) => {
      console.log(indice, item.id)
      return {
          id: indice,
          shippingDate: item.Nombre,
          stage: item.Sinonimo,
          place: item.EstadoFisico,
          containersQuantity: item.HojaSeguridad,
          waste: item.Cas,
          NamIngle: item.NombreIngles,
          uid: item.id,      
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
              pageSize={5}
              heckboxSelection
              rowsPerPageOptions={[5]}
              disableRowSelectionOnClick
              editMode={false}
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
