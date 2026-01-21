from pydantic import BaseModel

class Lesson(BaseModel):
    id: int
    title: str
    status: str
    publish_date: str
    video_url: str
    course_id: int
    creator_id: int



