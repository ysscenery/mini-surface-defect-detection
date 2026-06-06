FROM python:3.11

WORKDIR /app

COPY backend/ ./backend/
COPY model/ ./model/
COPY sample_dataset/ ./sample_dataset/

RUN pip install --no-cache-dir -r backend/requirements.txt

WORKDIR /app/backend

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]