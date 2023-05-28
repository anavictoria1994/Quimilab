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

const CreateWasteForm = () => {
  const [state, setState] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleChangeState = (event) => {
    setState(event.target.value);
  };

  const handleChangeRecipient = (event) => {
    setRecipient(event.target.value);
  };

  return (
    <Container>
      <Grid container sx={{}} spacing={1}>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Prueba o ensayo" placeholder="Generador actual" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Reactivos" placeholder="Generador actual" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="# Contenedores" placeholder="Generador actual" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Peso(kg)" placeholder="Generador actual" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Estado Físico</InputLabel>
            <Select
              labelId="select-state-label"
              id="select-state"
              value={state}
              label="Laboratorio"
              onChange={handleChangeState}
            >
              <MenuItem value={10}>Sólido</MenuItem>
              <MenuItem value={20}>Líquido</MenuItem>
              <MenuItem value={20}>Gaseoso</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Tipo de recipiente
            </InputLabel>
            <Select
              labelId="select-recipient-label"
              id="select-recipient"
              value={recipient}
              label="Tipo de recipiente"
              onChange={handleChangeRecipient}
            >
              <MenuItem value={10}>Plástico</MenuItem>
              <MenuItem value={20}>Vidrio transparente</MenuItem>
              <MenuItem value={20}>Vidrio ámbar</MenuItem>
              <MenuItem value={20}>Otro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField label="Generador" placeholder="Generador actual" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateWasteForm;
