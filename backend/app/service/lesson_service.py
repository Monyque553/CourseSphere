from fastapi import HTTPException, status
from typing import List
from app.schema.lesson_schema import Lesson
from app.database import lesson_collection
from app.models.lesson_model import lesson_model
import types


class LessonService:

    @staticmethod
    def create_lesson(data: Lesson):
        lesson_dict = data.dict()
        lesson_collection.insert_one(lesson_dict)

        return {
            "message": "Aula criada com sucesso",
            "lesson": lesson_model(lesson_dict)
        }

    @staticmethod
    def get_lessons_by_course(course_id: int) -> list:
        list_lessons = []
        list_lessons = lesson_collection.find({"course_id": course_id})

        if not list_lessons:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Aulas não encontradas para este curso"
            )

        list_lessons_models = []

        for lesson in list_lessons:
            list_lessons_models.append(lesson_model(lesson))

        return{
            "message": "Busca de aulas por curso realizadas com sucesso",
            "lessons" : list_lessons_models
        }

    @staticmethod
    def update_lesson(lesson_id:int, data: Lesson):
        lesson = lesson_collection.find_one({"id": lesson_id})

        if not lesson:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Aula não encontrada"
            )

        lesson_collection.update_one({"id": lesson_id}, {"$set": data.dict()})
        return {
            "message": "Aula atualizada com sucesso",
            "lesson": lesson_model(data.dict())
            }

    @staticmethod
    def delete_lesson(lesson_id: int):
        lesson = lesson_collection.find_one({"id": lesson_id})

        if not lesson:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Aula não encontrada"
            )
        lesson_collection.delete_one({"id": lesson_id})

        return {
            "message": "Aula deletada com sucesso"
            }