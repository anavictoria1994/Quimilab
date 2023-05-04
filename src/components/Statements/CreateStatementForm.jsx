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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

const CreateStatementForm = () => {
  const [age, setAge] = useState("");
  const [rowsWaste, setRowsWaste] = useState([
    {
      name: "Prueba 1",
      reactivo: "Reactivo 1",
    },
  ]);
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
          <TextField label="Nombre residuo" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Generador" placeholder="Generador actual" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Fecha de declaración" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Fecha de revisión" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Fecha de recepción" />
        </Grid>
        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle">Residuos</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ my: 1 }}>
          <Button onClick={() => c()}>Añadir</Button>
        </Grid>
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
                          bgcolor: "#FF0000",
                          color: "white",
                        }}
                        variant="contained"
                      >
                        El
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateStatementForm;
