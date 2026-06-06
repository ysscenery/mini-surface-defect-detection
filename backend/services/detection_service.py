from ultralytics import YOLO
from datetime import datetime

model = YOLO("../model/best.pt")

def detect_defects(image_path):

    results = model(image_path)

    defects = []

    meter = 0.5

    for result in results:

        for box in result.boxes:

            defects.append({
                "defect_type": result.names[int(box.cls)],
                "meter": meter,
                "confidence": round(float(box.conf), 2),
                "timestamp": datetime.now().strftime("%H:%M:%S")
            })

            meter += 0.5

    return defects