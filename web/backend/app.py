from flask import Flask, request
from sqlalchemy import select

from database import Base, SessionLocal, engine
from models import Record

app = Flask(__name__)

# Initialize the database
Base.metadata.create_all(engine)

def record_to_dict(record):
    return {
        "id": record.id,
        "title": record.title,
        "status": record.status,
    }

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/records")
def list_records():
    with SessionLocal() as db:
        items = db.scalars(
            select(Record).order_by(Record.id)
        ).all()

        return [record_to_dict(item) for item in items]

@app.post("/api/records")
def create_record():
    data = request.get_json(silent=True) or {}

    title = str(data.get("title", "")).strip()
    if not title:
        return {"error": "Title is required"}, 400

    status = str(data.get("status", "open")).strip() or "open"
    item = Record(title=title, status=status)

    with SessionLocal() as db:
        db.add(item)
        db.commit()
        db.refresh(item)
        
        return record_to_dict(item), 201
    
if __name__ == "__main__":
    app.run(debug=True)