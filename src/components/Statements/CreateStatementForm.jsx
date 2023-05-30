import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  IconButton,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateWasteForm from "./CreateWasteForm";
import { useAuthStatement } from "../../hooks/AuthContextStatements";
import { useAuth } from "../../context/AuthContext";

const CreateStatementForm = () => {
  const { usere } = useAuth();
  const { addStatements } = useAuthStatement();
  const [rowsWaste, setRowsWaste] = useState([
    {
      name: "Prueba 1",
      reactivo: "Reactivo 1",
    },
  ]);
  const [fechaCreacion, setFechaCreacion] = useState(dayjs());
  const [openWaste, setOpenWaste] = useState(false);
  const [openAler, setOpenAlert] = useState(false);
  const [statement, setStatement] = useState({
    generador: usere.nombre,
    laboratorio: "",
    fechaCreacion: fechaCreacion,
    fechaRevision: "",
    fechaRecepcion: "",
    residuos: ["reactivo1", "reactivo2"],
  });
  const [error,setError] = useState({
    error: false,
    text:"",
    
  });
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
};
  const handleChange = ({ target: { name, value } }) => {
    setStatement({ ...statement, [name]: value });
  };

  const c = () => {
    const n = {
      name: "Prueba 1",
      reactivo: "Reactivo 1",
    };
    setRowsWaste([...rowsWaste, n]);
  };

  const handleChangeOpenWaste = () => {
    setOpenWaste(!openWaste);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (statement.laboratorio == "") {
      setError({
        error: true,
        text: "Debe llenar todos los campos",
      });
      return;
    }
    try {
      await addStatements(statement);
      setOpenAlert(true);
      setStatement({
        generador: usere.nombre,
        laboratorio: "",
        fechaCreacion: fechaCreacion,
        fechaRevision: "",
        fechaRecepcion: "",
        residuos: ["reactivo1", "reactivo2"],
      })
      setError({
        error: false,
        text: "",
      });
    } catch (error) {
      setError({
        error: true,
        text:"Problemas con el registro",
      });
    }
  };
  return (
    <Container>
      <Grid container sx={{ p: 3 }} spacing={1}>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField
            name="generador"
            label="Generador"
            placeholder="Generador actual"
            value={statement.generador}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <FormControl fullWidth required>
            <InputLabel id="label-select-laboratorio" error={error.error} helperText={error.text}>Laboratorio</InputLabel>
            <Select
              labelId="label-select-laboratorio"
              name="laboratorio"
              label="Laboratorio"
              value={statement.laboratorio}
              onChange={handleChange}
              error={error.error} 
              helperText={error.text}
            >
              <MenuItem value={"lab1"}>Lab 1</MenuItem>
              <MenuItem value={"lab2"}>Lab 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="fechaCreacion"
              label="Fecha de creación"
              value={statement.fechaCreacion}
              disabled
              onChange={(newValue) => {
                setFechaCreacion(newValue);
                handleChange();
                console.log(newValue);
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField
            name="fechaRevision"
            label="Fecha de revisión"
            value={statement.fechaRevision}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField
            name="fechaRecepcion"
            label="Fecha de recepción"
            value={statement.fechaRecepcion}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle">Residuos</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 1 }}>
          {!openWaste && (
            <Button onClick={() => handleChangeOpenWaste()}>Añadir</Button>
          )}
          {openWaste && <IconButton>y</IconButton>}
          {openWaste && <IconButton>n</IconButton>}
        </Grid>
        {openWaste && <CreateWasteForm />}
        <Grid item xs={12} md={12} sx={{ my: 1 }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Prueba</TableCell>
                  <TableCell>Reactivos</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsWaste.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.reactivo}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "white",
                          color: "#FF0000",
                        }}
                        variant="contained"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "white",
                        }}
                        variant="contained"
                      >
                        <EditIcon color="warning" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Divider sx={{ width: "100%", mt: 2, bgcolor: "black" }} />
        <Grid item xs={12} md={6} sx={{ my: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="error"
            sx={{ width: "30%" }}
            onClick={handleSubmit}
          >
            Crear
          </Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 3, textAlign: "center" }}>
          <Button variant="contained" color="inherit" sx={{ width: "30%" }}>
            Cancelar
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openAler}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseAlert}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
        >
          Declaración Registrada Correctamente!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateStatementForm;
