from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MedicationLogCreate(BaseModel):
    patient_id: int
    medication_id: int
    scheduled_time: datetime
    reminder_mode: str = "voice"
    status: str = "pending"
    attempts: int = 0
    responded_at: datetime | None = None


class MedicationLogResponse(BaseModel):
    id: int
    patient_id: int
    medication_id: int
    scheduled_time: datetime
    reminder_mode: str
    status: str
    attempts: int
    responded_at: datetime | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)