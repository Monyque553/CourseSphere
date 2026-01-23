from app.service import user_service
from fastapi import APIRouter
from app.schema.user_schema import User
from app.database import user_collection
from app.models.user_model import user_model
from fastapi import HTTPException, status

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
def login(data: User):
    return user_service.UserService.login(data)

@router.post("/create")
def create_user (data: User):
    return user_service.UserService.create_user(data)

@router.get("/{user_id}")
def get_user_by_id(user_id: int):
    return user_service.UserService.get_user_by_id(user_id)

@router.put("/{user_id}")
def update_user(user_id: int, data: User):
    return user_service.UserService.update_user(user_id, data)

@router.delete("/{user_id}")
def delete_user(user_id: int):
    return user_service.UserService.delete_user(user_id)