import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import CoursesByInstructor from "./pages/course/coursesByInstructor";
import CoursesByCreator from "./pages/course/coursesByCreator";
import CreateLesson from "./pages/lesson/createLesson";
import UpdateLesson from "./pages/lesson/updateLesson";
import ListLesson from "./pages/lesson/listLesson";
import CreateCourse from "./pages/course/createCourse";
import CreateInstructor from "./pages/instructor/createInstructor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/courses/instructor" element={<CoursesByInstructor />} />
      <Route path="/courses/Creator" element={<CoursesByCreator />} />
      <Route path="/lesson/list" element={<ListLesson/>} />
      <Route path="/lesson/create" element={<CreateLesson/>} />
      <Route path="/course/create" element={<CreateCourse/>} />
      <Route path="/lesson/update" element={<UpdateLesson/>} />
      <Route path="/instructor/create" element={<CreateInstructor/>} />

    </Routes>
  );
}

export default App;
