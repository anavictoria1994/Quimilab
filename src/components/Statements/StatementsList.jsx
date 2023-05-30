import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Button,
  IconButton,
  Grid,
  TextField,
  Input,
  InputBase,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CreateStatementForm from "./CreateStatementForm";
import { useState } from "react";
import {useAuthStatement} from "../../hooks/AuthContextStatements" 

const StatementsList = () => {
    const {statements} = useAuthStatement();
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [open, setOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState(null)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      console.log(event.currentTarget)
      console.log(openMenu);
    };
    
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
  
    const openDialogCreate = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "shippingDate", headerName: "Fecha de envío", width: 150 },
      { field: "stage", headerName: "Etapa", width: 150 },
      { field: "place", headerName: "Espacio", width: 180 },
      {
        field: "containersQuantity",
        headerName: "Cant. contenedores",
        width: 150,
      },
      { field: "waste", headerName: "Residuos", width: 150 },
      {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        renderCell: () => (
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
              <MenuItem onClick={handleCloseMenu}>Editar</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Eliminar</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Otra</MenuItem>
            </Menu>
          </>
        ),
      },
    ];
    const rows = statements.map((item,index)=>{
      return {
        id: index,
        shippingDate: new Date(item.fecha_creacion.seconds * 1000).toLocaleDateString("en-US"),
        stage:item.etapa,
        place:item.id_laboratorio,
        containersQuantity:20,
        waste:item.residuos,
      }
    })
    return (
      <Container sx={{ my: 3 }}>
        <Card elevation={5}>
          <CardHeader title="Declaraciones" sx={{ textAlign: "center" }} />
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
                    placeholder="Buscar declaración"
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
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              editMode={false}
            />
          </CardContent>
        </Card>
        <Dialog open={open} onClose={() => handleClose()} fullScreen sx={{mx:{xs: 4, md:20}, my:{xs:4,md:10}}}>
          <DialogTitle sx={{ textAlign: "center" }}>
            Registro de declaraciones
          </DialogTitle>
          <DialogContent>
            <CreateStatementForm/>
          </DialogContent>
        </Dialog>
      </Container>
    );
};

export default StatementsList;
