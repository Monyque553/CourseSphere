def lesson_model(lesson) -> dict:
    return {
        "id": int(lesson["id"]),
        "title": str(lesson["title"]),
        "status": str(lesson["status"]),
        "publish_date": str(lesson["publish_date"]),
        "video_url": str(lesson["video_url"]),
        "course_id": int(lesson["course_id"]),
        "creator_id": int(lesson["creator_id"])
    }