def course_model(course) -> dict:
    return {
        "id": int(course["id"]),
        "name": str(course["name"]),
        "description": str(course["description"]),
        "start_date": str(course["start_date"]),
        "end_date": str(course["end_date"]),
        "id_creator": int(course["id_creator"]),
        "instructors": list(course["instructors"])
    }



