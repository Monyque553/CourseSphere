def user_model(user) -> dict:
    return {
        "id": int(user["id"]),
        "email": str(user["email"]),
        "name": str(user["name"]),
        "role": str(user["role"])
    }
