import {useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from "@mui/material";

import api from "../../services/api";
import { useNavigate } from "react-router-dom";


function CreateCourse() {

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [id_creator, setIdCreator] = useState(user.id);
  const [apiInstructors, setApiInstructors] = useState([]);
  const [instructors, setInstructors] = useState([]);

     useEffect(() => {
    getAllInstructors();
  }, []);

    const getAllInstructors = async () => {
    try {
      const response = await api.get(
        `/auth/instructors/list`
      );
      console.log("instructors vindo da api", response.data.instructors);
      setApiInstructors(response.data.instructors);
    } catch (error) {
      console.error(error);
    }
  };

 
    const handleCreateCourse = async () => {
  console.log("selected instructors (ids):", instructors);

  if (
    id === 0 ||
    name === "" ||
    description === "" ||
    start_date === "" ||
    end_date === ""
  ) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (end_date < start_date) {
    alert("A data de fim não pode ser anterior à data de início.");
    return;
  }

  try {
    const response = await api.post(`/course/create`, {
      id,
      name,
      description,
      start_date,
      end_date,
      id_creator,
      instructors
    });

    setId(0);
    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setInstructors([]);

    alert(response.data.message);
    console.log(response.data);

  } catch (error) {
    if (error.response) {
      alert(error.response.data.detail);
    } else {
      console.error(error);
      alert("Erro inesperado.");
    }
  }
};



return (
    <Box
      sx={{
        width: 300,
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >
      <Typography variant="h5">Cadastrar Curso</Typography>

      <TextField
        label="ID"
        type="number"
        value={id}
        onChange={(e) => setId(parseInt(e.target.value))}
      />

      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TextField
        label="Data de Início"
        type = "date"
        InputLabelProps={{ shrink: true }}
        value={start_date}
        onChange={(e) => setStartDate(e.target.value.toString())}
      />

      <TextField
        label="Data de Fim"
        type = "date"
        InputLabelProps={{ shrink: true }}
        value={end_date}
        onChange={(e) => setEndDate(e.target.value.toString())}
      />

     <FormControl>
  <InputLabel id="instructors-label">
    Instrutores
  </InputLabel>

  <Select
    labelId="instructors-label"
    multiple
    value={instructors}
    onChange={(e) => setInstructors(e.target.value)}
    input={<OutlinedInput label="Instrutores" />}
    renderValue={(selected) =>
      apiInstructors
        .filter((inst) => selected.includes(inst.id))
        .map((inst) => inst.name)
        .join(", ")
    }
  >
    {apiInstructors.map((instructor) => (
      <MenuItem key={instructor.id} value={instructor.id}>
        {instructor.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

      <Button variant="contained" onClick={handleCreateCourse}>
        Salvar
      </Button>

      
    </Box>
  );
}

export default CreateCourse;
