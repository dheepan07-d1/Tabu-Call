from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database.connection import get_db
from backend.models.patient import Patient
from backend.models.prescription import Prescription
from backend.schemas.prescription import (
    PrescriptionCreate,
    PrescriptionResponse,
)

router = APIRouter(
    prefix="/prescriptions",
    tags=["Prescriptions"],
)


@router.get("", response_model=list[PrescriptionResponse])
def get_prescriptions(db: Session = Depends(get_db)):
    return db.query(Prescription).all()


@router.post("", response_model=PrescriptionResponse, status_code=201)
def create_prescription(
    prescription: PrescriptionCreate,
    db: Session = Depends(get_db),
):
    patient = db.query(Patient).filter(
        Patient.id == prescription.patient_id
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found",
        )

    new_prescription = Prescription(
        patient_id=prescription.patient_id,
        image_path=prescription.image_path,
        original_filename=prescription.original_filename,
        processing_status=prescription.processing_status,
        ocr_text=prescription.ocr_text,
    )

    db.add(new_prescription)
    db.commit()
    db.refresh(new_prescription)

    return new_prescription