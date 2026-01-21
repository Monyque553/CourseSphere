from pydantic import BaseModel

class Course(BaseModel):
    id: int
    name: str
    description: str 
    start_date: str
    end_date: str
    id_creator: int
    instructors: list[int]

