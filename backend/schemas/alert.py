from datetime import datetime
from pydantic import BaseModel


class AlertBase(BaseModel):
    patient_id: int
    medication_log_id: int | None = None
    type: str = "follow_up"
    message: str
    status: str = "active"


class AlertCreate(AlertBase):
    pass


class AlertResponse(AlertBase):
    id: int
    created_at: datetime
    resolved_at: datetime | None = None

    class Config:
        from_attributes = True