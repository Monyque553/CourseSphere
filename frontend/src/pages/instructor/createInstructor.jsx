import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../../services/api";

function create_instructor() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("I");

    const handleCreateInstructor = async () => {
      if(id== 0 || name=="" || email=="" || password==""){
        alert("Por favor, preencha todos os campos.");
        return;
      }else{
        try{
            const response = await api.post("/auth/create",{
            id,
            name,
            email,
            password,
            role
        });
      
        setId(0);
        setName("");
        setEmail("");
        setPassword("");
      alert(response.data.message);
      console.log(response.data);    
    
    }catch (error) {
      alert(error.response.data.detail);
        


    
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
      <Typography variant="h5">Cadastrar Instrutor</Typography>

      <TextField
        label="ID"
        type="number"
        value={id}
        onChange={(e) => setId(parseInt(e.target.value))}
      />

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" onClick={handleCreateInstructor}>
        Salvar
      </Button>
    </Box>
  );
}

export default create_instructor;
