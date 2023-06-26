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
  FormControlLabel,
  Checkbox,
  Box,
  Chip,
  Autocomplete,
} from "@mui/material";
import { DataGrid, gridColumnLookupSelector } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useAuth } from "../../hooks/AuthContextReactivos";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuthStatement } from "../../hooks/AuthContextStatements";

const CreateWasteForm = ({ stateForm, addWaste, updateWaste, action, wasteToUpdate, setWasteToUpdate }) => {
  const { reactivos } = useAuth();
  //const { addWaste } = useAuthStatement();
  const [wasteReactivos, setWasteReactivos] = useState([])
  const [waste, setWaste] = useState({
    nombre: wasteToUpdate? wasteToUpdate.object.nombre : "",
    corriente: wasteToUpdate? wasteToUpdate.object.corriente : "",
    reactivos: wasteToUpdate? wasteToUpdate.object.reactivos : [],
    cantidadGenerada: wasteToUpdate? wasteToUpdate.object.cantidadGenerada : "",
    unidades: wasteToUpdate? wasteToUpdate.object.unidades : "",
    tipoEmbalaje: wasteToUpdate? wasteToUpdate.object.tipoEmbalaje : "",
    descripcion: wasteToUpdate? wasteToUpdate.object.descripcion : "",
    estadoFQ: wasteToUpdate? wasteToUpdate.object.estadoFQ : "",
    inflamable: wasteToUpdate? wasteToUpdate.object.inflamable : false,
  });

  const [buttonState, setButtonState] = useState(false);

  const handleChecked = ({ target: { checked } }) => {
    setWaste({ ...waste, inflamable: checked });
  };

  const handleChange = ({ target: { name, value, id, option } }, r=0) => {
    console.log("id: "+id)
    console.log("name: "+r)
    if(id && id.includes("reactivos-option-")){
      let newArray = [...waste.reactivos]
      newArray.push(r)
      setWaste({...waste, reactivos: newArray.pop()})
    }else {
      setWaste({ ...waste, [name]: value });
    }    
    console.log(wasteReactivos)
    console.log(waste.reactivos)
    
  };

  const handleDelete = (reactivo) => {
    const reactivos_ = (array) =>
      array.filter((item) => item.uid !== reactivo.uid);
    setWaste({ ...waste, reactivos: reactivos_ });
    console.log("eliminadooooo");
  };

  const [error, setError] = useState(false);
  const handleBlur = () => {
    if (waste.nombre == "") setError(!error);
    else setError(false);
  };

  const validate = () => {
    if (
      waste.nombre == "" ||
      waste.corriente == "" ||
      waste.cantidadGenerada == "" ||
      waste.unidades == "" ||
      waste.tipoEmbalaje == "" ||
      waste.estadoFQ == ""
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = () => {
    if (validate()) {
      if(action === "crear") addWaste(waste);
      else updateWaste(waste, wasteToUpdate.index)
    } else {
      alert("llene todo");
    }
  };

  const clearForm = () => {
    setWasteToUpdate({
      object: {
        nombre: "",
        corriente: "",
        reactivos: [],
        cantidadGenerada: "",
        unidades: "",
        tipoEmbalaje: "",
        descripcion: "",
        estadoFQ: "",
        inflamable: false,
      },
      index: ""
    })
  }

  const type = "number";

  return (
    <Container>
      <Grid container sx={{}} spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Características
          </Typography>
        </Grid>
        <Divider sx={{ width: "100%", mt: 2, bgcolor: "black" }} />
        <Grid item xs={12} md={5} sx={{ my: 2 }}>
          <TextField
            required
            name="nombre"
            label="Nombre"
            placeholder="Nombre"
            value={waste.nombre}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5} sx={{ my: 2 }}>
          <FormControl fullWidth required>
            <InputLabel
              id="label-select-corriente"
              helperText={"Decreto 4741 Y/A"}
            >
              Corriente (Decreto 4741 Y/A)
            </InputLabel>
            <Select
              required
              labelId="label-select-corriente"
              name="corriente"
              label="Corriente (Decreto 4741 Y/A)"
              helperText={"Decreto 4741 Y/A"}
              value={waste.corriente}
              onChange={handleChange}
            >
              <MenuItem value={"corrosivo"}>Corrosivo</MenuItem>
              <MenuItem value={"reactivo"}>Reactivo</MenuItem>
              <MenuItem value={"explosivo"}>Explosivo</MenuItem>
              <MenuItem value={"tóxico"}>Tóxico</MenuItem>
              <MenuItem value={"inflamable"}>Inflamable</MenuItem>
              <MenuItem value={"infeccioso"}>Infeccioso</MenuItem>
              <MenuItem value={"radioactivo"}>Radioactio</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Embalaje del residuo
          </Typography>
        </Grid>
        <Divider sx={{ width: "100%", mt: 2, bgcolor: "black" }} />
        <Grid item xs={12} md={8} sx={{ my: 2 }}>
          {/* <FormControl fullWidth required>
            <InputLabel id="label-select-reactivos" helperText={"Reactivos"}>Reactivos</InputLabel>
            <Select
              required
              labelId="label-select-reactivos"
              id="rectivos"
              name="reactivos"
              label="Reactivos"
              helperText={"Reactivos usados"}
              multiple
              value={waste.reactivos}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <Chip 
                      key={value.uid} 
                      label={value} 
                      clickable
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                      onDelete={()=>{handleDelete(value)}}/>
                  ))}
                </Box>
              )}
            >
              {reactivos.map(item => (
              <MenuItem value={item.Nombre}>{item.Nombre}</MenuItem>
              ))}
            </Select>
          </FormControl> */}
          
          <Autocomplete
          fullWidth
          multiple
          id="reactivos"
          onChange={
            handleChange
          }
          options={reactivos}
          getOptionLabel={(option) => option.Nombre}
          filterSelectedOptions
          renderInput={(params) => (
          <TextField
            {...params}
            label="Reactivos"
          />
        )}
      />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField
            required
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            name="cantidadGenerada"
            label="Cantidad generada (kg)"
            placeholder=""
            value={waste.cantidadGenerada}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <TextField
            required
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            name="unidades"
            label="Unidades"
            placeholder=""
            value={waste.unidades}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <FormControl fullWidth required>
            <InputLabel id="select-recipient-label">
              Tipo de embalaje
            </InputLabel>
            <Select
              required
              labelId="select-recipient-label"
              id="tipoEmbalaje"
              name="tipoEmbalaje"
              label="Tipo de recipiente"
              value={waste.tipoEmbalaje}
              onChange={handleChange}
            >
              <MenuItem value={"plástico"}>Plástico</MenuItem>
              <MenuItem value={"vidrio transparente"}>
                Vidrio transparente
              </MenuItem>
              <MenuItem value={"vidrio ámbar"}>Vidrio ámbar</MenuItem>
              <MenuItem value={"otro"}>Otro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} sx={{ my: 2 }}>
          <TextField
            fullWidth
            id="descripcion"
            name="descripcion"
            label="Descripcion"
            multiline
            rows={5}
            value={waste.descripcion}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Características Fisicoquímicas
          </Typography>
        </Grid>
        <Divider sx={{ width: "100%", mt: 2, bgcolor: "black" }} />
        <Grid item xs={12} md={4} sx={{ my: 2 }}>
          <FormControl fullWidth required>
            <InputLabel id="select-state-label">
              Estado fisicoquímico
            </InputLabel>
            <Select
              required
              labelId="select-state-label"
              id="estadoFQ"
              name="estadoFQ"
              label="Estado fisicoquímico"
              value={waste.estadoFQ}
              onChange={handleChange}
            >
              <MenuItem value={"sólido"}>Sólido</MenuItem>
              <MenuItem value={"líquido"}>Líquido</MenuItem>
              <MenuItem value={"gaseoso"}>Gaseoso</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: 2, mx: 2 }}>
          <FormControlLabel
            required
            control={<Checkbox />}
            name="inflamable"
            id="inflamable"
            label="Es inflamable?"
            value={waste.inflamable}
            onChange={handleChecked}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 1, textAlign: "center" }}>
          <Box sx={{}}>
            <IconButton
              variant="outlined"
              color="success"
              size="medium"
              sx={{ mx: 1 }}
              onClick={() => {handleSubmit()}}
            >
              <CheckIcon fontSize="large" />
            </IconButton>
            <IconButton
              sx={{ color: "red", mx: 1 }}
              size="medium"
              onClick={() => {clearForm(); stateForm()}}
            >
              <ClearIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateWasteForm;
