from fastapi import APIRouter
from app.schema.course_schema import Course
from app.service import course_service
from fastapi import HTTPException, status

router = APIRouter(prefix="/course", tags=["Course"])

@router.post("/create")
def create_course(data: Course):
    return course_service.CourseService.create_course(data)

@router.get("/creator/{id_creator}")
def get_courses_by_creator(id_creator: int):
    return course_service.CourseService.get_course_by_creator(id_creator)

@router.get("/instructor/{id_instructor}")
def get_courses_by_instructor(id_instructor: int):
    return course_service.CourseService.get_course_by_instructor(id_instructor)

@router.put("/update/{course_id}")
def update_course(course_id: int, data: Course):
    return course_service.CourseService.update_course(course_id, data)

@router.delete("/delete/{course_id}")
def delete_course(course_id: int):
    return course_service.CourseService.delete_course(course_id)

    