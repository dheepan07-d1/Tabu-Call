from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database.connection import get_db
from backend.models.medication_log import MedicationLog
from backend.models.patient import Patient
from backend.models.medication import Medication
from backend.schemas.medication_log import (
    MedicationLogCreate,
    MedicationLogResponse,
)

router = APIRouter(
    prefix="/medication-logs",
    tags=["Medication Logs"],
)


@router.get("", response_model=list[MedicationLogResponse])
def get_medication_logs(db: Session = Depends(get_db)):
    return db.query(MedicationLog).all()


@router.post("", response_model=MedicationLogResponse, status_code=201)
def create_medication_log(
    log: MedicationLogCreate,
    db: Session = Depends(get_db),
):
    patient = db.query(Patient).filter(
        Patient.id == log.patient_id
    ).first()

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found",
        )

    medication = db.query(Medication).filter(
        Medication.id == log.medication_id,
        Medication.patient_id == log.patient_id,
    ).first()

    if not medication:
        raise HTTPException(
            status_code=404,
            detail="Medication not found for this patient",
        )

    new_log = MedicationLog(
        patient_id=log.patient_id,
        medication_id=log.medication_id,
        scheduled_time=log.scheduled_time,
        reminder_mode=log.reminder_mode,
        status=log.status,
        attempts=log.attempts,
        responded_at=log.responded_at,
    )

    db.add(new_log)
    db.commit()
    db.refresh(new_log)

    return new_log