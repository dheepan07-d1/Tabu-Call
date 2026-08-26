from datetime import datetime
from pydantic import BaseModel


class MedicationCreate(BaseModel):
    prescription_id: int | None = None
    patient_id: int
    medicine_name: str
    dosage: str
    frequency: str
    timing: str | None = None
    food_relation: str | None = None
    active: bool = True


class MedicationResponse(BaseModel):
    id: int
    prescription_id: int | None
    patient_id: int
    medicine_name: str
    dosage: str
    frequency: str
    timing: str | None
    food_relation: str | None
    active: bool
    created_at: datetime

    class Config:
        from_attributes = True