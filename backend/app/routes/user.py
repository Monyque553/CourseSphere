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

