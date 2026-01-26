from app.schema.user_schema import User
from app.database import user_collection
from app.models.user_model import user_model
from fastapi import HTTPException, status

class UserService:

    @staticmethod
    def login(data: dict):
        user = user_collection.find_one({"email": data["email"]})

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )

        if user["password"] != data["password"]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Senha inválida"
            )

        return {
            "message": "Login realizado com sucesso",
            "user": user_model(user)
        }

    @staticmethod
    def create_user(data: User):
        existing_user = user_collection.find_one({"email": data.email})

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email já cadastrado"
            )

        user_dict = data.dict()
        user_collection.insert_one(user_dict)

        return {
            "message": "Usuário criado com sucesso",
            "user": user_model(user_dict)
        }


    @staticmethod
    def get_user_by_id(user_id: int):
        user = user_collection.find_one({"id": user_id})

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )

        return {
            "message": "Usuário encontrado com sucesso",
            "user": user_model(user)
        }
    @staticmethod
    def get_all_instructors():
        instructors = list(user_collection.find({"role": "I"}))

        model_list_instructors = []
        for instructor in instructors:
            model_list_instructors.append(user_model(instructor))
        return {
            "message": "Instrutores encontrados com sucesso",
            "instructors": model_list_instructors
        }

    @staticmethod
    def update_user(user_id:int, data: User):
        user = user_collection.find_one({"id": user_id})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )

        user_collection.update_one({"id": user_id}, {"$set": data.dict()})

        return {
            "message": "Usuário atualizado com sucesso",
            "user": user_model(data.dict())
        }

    @staticmethod
    def delete_user(user_id: int):
        user = user_collection.find_one({"id": user_id})

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )

        user_collection.delete_one({"id": user_id})

        return {
            "message": "Usuário deletado com sucesso"
        }