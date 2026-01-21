from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.teste import router as teste_router
from app.routes.user import router as user_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(teste_router)

@app.get("/")
def root():
    return {"message": "FastAPI rodando no Ubuntu 🚀"}
