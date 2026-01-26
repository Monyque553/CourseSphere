import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../../services/api";


function CreateLesson() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [publish_date, setPublishDate] = useState("");
  const [video_url, setVideoUrl] = useState("");
  const [course_id, setCourseId] = useState(sessionStorage.getItem("courseId"));
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [instructor_id, setInstructorId] = useState(user.id);

  console.log("course_id", course_id);
  console.log("instructor_id", instructor_id);

 
    const handleCreateLesson = async () => {
      if(id== 0 || title=="" || status=="" || publish_date=="" || video_url==""){
        alert("Por favor, preencha todos os campos.");
        return;
      }else{
        try{
            const response = await api.post("/lesson/create",{
            id,
            title,
            status,
            publish_date,
            video_url,
            course_id,
            instructor_id
        });

      setId(0);
      setTitle("");
      setStatus("");
      setPublishDate("");
      setVideoUrl("");
      
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
      <Typography variant="h5">Cadastrar aula</Typography>

      <TextField
        label="ID"
        type="number"
        value={id}
        onChange={(e) => setId(parseInt(e.target.value))}
      />

      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <TextField
        label="Data de Publicação"
        value={publish_date}
        onChange={(e) => setPublishDate(e.target.value)}
      />

      <TextField
        label="URL do Vídeo"
        value={video_url}
        onChange={(e) => setVideoUrl(e.target.value)}
      />


      <Button variant="contained" onClick={handleCreateLesson}>
        Salvar
      </Button>
    </Box>
  );
}

export default CreateLesson;
