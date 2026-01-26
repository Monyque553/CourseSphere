import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";

function CoursesByCreator() {
  const [courses, setCourses] = useState([]);
  const instructorId = sessionStorage.getItem("user.id");
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    console.log("cursos no state", courses);
  }, [courses]);

  const getCourses = async () => {
    try {
      const response = await api.get(
        `/course/creator/${user.id}`
      );

      console.log("cursos vindo da api", response.data.courses);
      setCourses(response.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  

  const getLessons = (courseId) => {
    sessionStorage.setItem("courseId", courseId);
    navigate("/lesson/list");
  };

  const createCourse = () => {
    navigate("/course/create");
  }

  const createInstructor = () => {
    navigate("/instructor/create");
  }

  const deleteCourse = async (courseId) => {
    const confirmar = window.confirm("Você tem certeza que deseja deletar esse curso?");
    if (confirmar) {
      const response = await api.delete(`/course/delete/${courseId}`);
      alert("Curso deletado com sucesso!");
      getCourses();
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meus Cursos
      </Typography>

      {courses.length === 0 && (
        <Typography>Nenhum curso encontrado.</Typography>
      )}

      {courses.map((course) => (
        <Card key={course.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {course.name}
            </Typography>

            <Typography color="text.secondary">
              {course.description}
            </Typography>

            <Typography variant="body2">
              Início: {course.start_date}
            </Typography>

            <Typography variant="body2">
              Fim: {course.end_date}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => getLessons(course.id)}
              sx={{ marginTop: 2 }}
            >
              Ver Aulas
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => deleteCourse(course.id)}
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
              onClick={() => createCourse()}
              sx={{ marginTop: 2 }}
            >
              Criar curso
            </Button>

         <Button
              variant="contained"
              color="primary"
              onClick={() => createInstructor()}
              sx={{ marginTop: 2 }}
            >
              Adicionar novo Instrutor
            </Button>
    </Box>
  );
}

export default CoursesByCreator;
