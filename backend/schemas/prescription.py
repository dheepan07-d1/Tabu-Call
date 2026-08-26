from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PrescriptionCreate(BaseModel):
    patient_id: int
    image_path: str | None = None
    original_filename: str | None = None
    processing_status: str = "uploaded"
    ocr_text: str | None = None


class PrescriptionResponse(BaseModel):
    id: int
    patient_id: int
    image_path: str | None
    original_filename: str | None
    processing_status: str
    ocr_text: str | None
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)