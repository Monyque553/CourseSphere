from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)
db = client["coursesphere_db"]

user_collection = db["users"]
course_collection = db["courses"]
lesson_collection = db["lessons"]