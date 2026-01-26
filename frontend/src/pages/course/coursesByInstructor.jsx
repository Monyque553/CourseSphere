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

function CoursesByInstructor() {
  const [courses, setCourses] = useState([]);
  const instructorId = sessionStorage.getItem("user.id");
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    console.log("cursos no state", courses);
  }, [courses]);

  const fetchCourses = async () => {
    try {
      const response = await api.get(
        `/course/instructor/${user.id}`
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
          </CardContent>
         

      
        </Card>
      ))}
    </Box>
  );
}

export default CoursesByInstructor;
