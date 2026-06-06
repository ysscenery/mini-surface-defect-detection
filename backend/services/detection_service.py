from ultralytics import YOLO

# Model uygulama açılırken bir kez yüklensin
model = YOLO("../model/best.pt")


def detect_defects(image_path):

    results = model(image_path)

    defects = []

    for result in results:

        for box in result.boxes:

            defects.append({
                "defect_type": result.names[int(box.cls)],
                "confidence": round(float(box.conf), 2)
            })

    return defects