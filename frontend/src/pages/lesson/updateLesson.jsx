import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../../services/api";


function updateLesson() {

  const lesson = JSON.parse(sessionStorage.getItem("lesson"));
  const [id, setId] = useState(lesson.id);
  const [title, setTitle] = useState(lesson.title);
  const [status, setStatus] = useState(lesson.status);
  const [publish_date, setPublishDate] = useState(lesson.publish_date);
  const [video_url, setVideoUrl] = useState(lesson.video_url);
  const [course_id, setCourseId] = useState(lesson.course_id);
  const [instructor_id, setInstructorId] = useState(lesson.instructor_id);

    const handleUpdateLesson = async () => {
      if(id== 0 || title=="" || status=="" || publish_date=="" || video_url==""){
        alert("Por favor, preencha todos os campos.");
        return;
      }else{
        try{
            const response = await api.put(`/lesson/update/${id}`,{
            id,
            title,
            status,
            publish_date,
            video_url,
            course_id,
            instructor_id
        });
        
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


      <Button variant="contained" onClick={handleUpdateLesson}>
        Alterar
      </Button>
    </Box>
  );
}

export default updateLesson;
