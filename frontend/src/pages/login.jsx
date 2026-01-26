import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      
      const user = response.data.user;
      sessionStorage.setItem("user", JSON.stringify(user));

      if(user.role === "I"){
        alert(response.data.message);
        console.log(response.data);
        navigate("/courses/instructor");
      }else if (user.role === "C"){
        navigate("/courses/creator");
     
      }
 
    } catch (error) {
      alert("error.response.data.message");
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
      <Typography variant="h5">Login</Typography>

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" onClick={handleLogin}>
        Entrar
      </Button>
    </Box>
  );
}

export default Login;
