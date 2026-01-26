from fastapi import APIRouter
from app.schema.lesson_schema import Lesson
from app.service import lesson_service
from fastapi import HTTPException, status

router = APIRouter(prefix="/lesson", tags=["Lesson"])

@router.post("/create")
def create_lesson(data: Lesson):
    return lesson_service.LessonService.create_lesson(data)

@router.put("/update/{lesson_id}")
def update_lesson(lesson_id: int, data: Lesson):
    return lesson_service.LessonService.update_lesson(lesson_id, data)

@router.delete("/delete/{lesson_id}")
def delete_lesson(lesson_id: int):
    return lesson_service.LessonService.delete_lesson(lesson_id)

@router.get("/list/{course_id}")
def get_lessons_by_course(course_id: int):
    return lesson_service.LessonService.get_lessons_by_course(course_id)