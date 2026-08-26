from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PatientCreate(BaseModel):
    name: str
    age: int
    phone: str
    sensory_mode: str = "voice"
    status: str = "active"


class PatientResponse(BaseModel):
    id: int
    name: str
    age: int
    phone: str
    sensory_mode: str
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)