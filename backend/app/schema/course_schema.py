from pydantic import BaseModel
from datetime import datetime

class Course(BaseModel):
    id: int
    name: str
    description: str 
    start_date: str
    end_date: str
    id_creator: int
    instructors: list[int]

