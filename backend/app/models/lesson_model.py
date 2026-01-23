def lesson_model(lesson) -> dict:
    return {
        "id": int(lesson["id"]),
        "title": str(lesson["title"]),
        "status": str(lesson["status"]),
        "publish_date": str(lesson["publish_date"]),
        "video_url": str(lesson["video_url"]),
        "course_id": int(lesson["course_id"]),
        "instructor_id": int(lesson["instructor_id"])
    }