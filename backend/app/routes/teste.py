from fastapi import APIRouter

router = APIRouter()

@router.get("/teste")
def teste():
    return {"message": "Rota de teste funcionando corretamente!"}

    