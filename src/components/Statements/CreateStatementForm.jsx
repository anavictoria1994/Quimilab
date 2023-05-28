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
  Divider
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateWasteForm from "./CreateWasteForm";

const CreateStatementForm = () => {
  const [age, setAge] = useState("");
  const [rowsWaste, setRowsWaste] = useState([
    {
      name: "Prueba 1",
      reactivo: "Reactivo 1",
    },
  ]);
  const [value, setValue] = useState(dayjs());
  const [openWaste, setOpenWaste] = useState(false);
  
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const c = () => {
    const n = {
      name: "Prueba 1",
      reactivo: "Reactivo 1",
    };
    setRowsWaste([...rowsWaste, n]);
  };

  const handleChangeOpenWaste = () => {
    setOpenWaste(!openWaste)
  }

  return (
    <Container>
      <Grid container sx={{ p: 3 }} spacing={1}>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Laboratorio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Laboratorio"
              onChange={handleChange}
            >
              <MenuItem value={10}>Lab 1</MenuItem>
              <MenuItem value={20}>Lab 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Generador" placeholder="Generador actual" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
                label="Fecha de creación"
                value={value}
                disabled
                onChange={(newValue) => {setValue(newValue); alert(newValue)}}
              />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Fecha de revisión" value="pendiente" disabled/>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Fecha de recepción" value="pendiente" disabled/>
        </Grid>
        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle">Residuos</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 1 }}>
          {!openWaste && <Button onClick={() => handleChangeOpenWaste()}>Añadir</Button>}
          {openWaste && <IconButton>y</IconButton>}
        {openWaste && <IconButton>n</IconButton>}
        </Grid>
        {openWaste && <CreateWasteForm/>}
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
                          color: "#FF0000"
                        }}
                        variant="contained"
                      >
                        <DeleteIcon/>
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "white"
                        }}
                        variant="contained"
                      >
                        <EditIcon color="warning"/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Divider sx={{width:"100%", mt:2, bgcolor:"black"}}/>
        <Grid item xs={12} md={6} sx={{ my: 3, textAlign: "center" }}>
          <Button variant="contained" color="error" sx={{ width: "30%" }}>
            Crear
          </Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 3, textAlign: "center" }}>
          <Button variant="contained" color="inherit" sx={{ width: "30%" }}>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateStatementForm;
