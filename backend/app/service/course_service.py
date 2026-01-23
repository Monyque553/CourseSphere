from typing import List, Dict, Any
from fastapi import HTTPException, status
from app.database import course_collection
from app.models.course_model import course_model
from app.schema.course_schema import Course


class CourseService:

    @staticmethod
    def create_course(data: Course):
        course_dict = data.dict()
        course_collection.insert_one(course_dict)

        return {
            "message": "Curso criado com sucesso",
            "course": course_model(course_dict)
        }

    @staticmethod
    def get_course_by_creator(id_creator: int) -> list:
        list_courses = []
        list_courses = course_collection.find({"id_creator": id_creator})
        
        if not list_courses:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cursos não encontrados para este criador"
            )
        
        list_course_model = []
        for course in list_courses:
            print(course)
            list_course_model.append(course_model(course))

        return {
            "message": "Busca de cursos por criador realizadas com sucesso",
            "courses": list_course_model
        }


    @staticmethod
    def get_course_by_instructor(id_instructor: int) -> list:
       course_list = []
       course_list = course_collection.find()

       courses_by_instructor = []
       for course in course_list:
            if(id_instructor in course["instructors"]):
                courses_by_instructor.append(course_model(course))

       return {
            "message": "Busca de cursos por instrutor realizadas com sucesso",
            "courses": courses_by_instructor
        }

    @staticmethod
    def update_course(course_id: int, data: Course):
        course = course_collection.find_one({"id": course_id})

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Curso não encontrado"
            )

        course_collection.update_one({"id": course_id}, {"$set": data.dict()})

        return {
            "message": "Curso atualizado com sucesso",
            "course": course_model(data.dict())
        }

    @staticmethod
    def delete_course(course_id: int):
        course = course_collection.find_one({"id": course_id})

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Curso não encontrado"
            )

        course_collection.delete_one({"id": course_id})

        return {
            "message": "Curso deletado com sucesso"
        }

    @staticmethod
    def get_all_courses() -> list:
        list_courses = []
        list_courses = course_collection.find()
        
        if not list_courses:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Nenhum curso encontrado"
            )
        
        list_course_model = []
        for course in list_courses:
            list_course_model.append(course_model(course))

        return {
            "message": "Busca de todos os cursos realizada com sucesso",
            "courses": list_course_model
        }