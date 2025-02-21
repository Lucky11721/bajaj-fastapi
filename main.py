from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class RequestModel(BaseModel):
    data: List[str]

@app.get("/bfhl")
async def get_operation_code():
    return {"operation_code": 1}

@app.post("/bfhl")
async def process_data(request: RequestModel):
    numbers = [item for item in request.data if item.isdigit()]
    alphabets = [item for item in request.data if item.isalpha()]
    highest_alphabet = [max(alphabets, key=str.lower)] if alphabets else []

    response = {
        "is_success": True,
        "user_id": "your_name_ddmmyyyy",
        "email": "your_email@domain.com",
        "roll_number": "your_roll_number",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    }
    return response
