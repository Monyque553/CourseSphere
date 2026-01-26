import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List
} from "@mui/material";

function ListLesson() {
  const [lessons, setLessons] = useState([]);
  const courseId = sessionStorage.getItem("courseId");
  const navigate = useNavigate();

  useEffect(() => {
    getLessons();
  }, []);

  useEffect(() => {
    console.log("lessons no state", lessons);
  }, [lessons]);

  const getLessons = async () => {
    try {
      const response = await api.get(
        `/lesson/list/${courseId}`
      );

      console.log("lessons vindo da api", response.data.lessons);
      setLessons(response.data.lessons);
    } catch (error) {
      console.error(error);
    }
  };

  const editLesson = (lesson) => {
    console.log("lesson para editar", lesson);
    sessionStorage.setItem("lesson", JSON.stringify(lesson));
    navigate("/lesson/update");
  }

  const deleteLesson = async (lessonId) => {
    const confirmar = window.confirm("Você tem certeza que deseja deletar essa aula?");
    if (confirmar) {
      const response = await api.delete(`/lesson/delete/${lessonId}`);
      alert("Aula deletada com sucesso!");
      getLessons();
    }
  }

  const handleCreateLesson = () => {
    navigate("/lesson/create");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Aulas do Curso
      </Typography>

      {lessons.length === 0 && (
        <Typography>Nenhuma aula encontrada.</Typography>
      )}


      {lessons.map((lesson) => (
        <Card key={lesson.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {lesson.title}
            </Typography>

            <Typography color="text.secondary">
              {lesson.status}
            </Typography>

            <Typography variant="body2">
              Publicação: {lesson.publish_date}
            </Typography>

            <Typography variant="body2">
              Vídeo: {lesson.video_url}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => editLesson(lesson)}
              sx={{ marginTop: 2 }}
            >
              Editar
            </Button>

           <Button
              variant="contained"
              color="error"
              onClick={() => deleteLesson(lesson.id)}
              sx={{ marginTop: 2 }}
            >
              Deletar
            </Button>
   

          </CardContent>
         
        
      
      
        </Card>

        
      ))}
        <Button
              variant="contained"
              color="primary"
              onClick={() => handleCreateLesson()}
              sx={{ marginTop: 2 }}
            >
              Adicionar Aula
            </Button>

    </Box>
  );
}

export default ListLesson;
