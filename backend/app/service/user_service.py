from app.schema.user_schema import User
from app.database import user_collection
from app.models.user_model import user_model
from fastapi import HTTPException, status

class UserService:

    @staticmethod
    def login(data: User):
        user = user_collection.find_one({"email": data.email})

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )

        if user["password"] != data.password:
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
