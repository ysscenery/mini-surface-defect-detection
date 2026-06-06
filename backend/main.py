from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.detection_service import detect_defects

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Mini Surface Defect Detection API"
    }


@app.get("/detect")
def detect():

    image_path = "../test_images/4.jpg"

    return detect_defects(image_path)